const ganache = require('ganache-cli');
const assert = require('assert');
const Web3 = require('web3');
//const { beforeEach, describe, it } = require('mocha');
const compiledFactory = require('../../src/ethereum/build/CompaignFactory.json');
const compiledCampaign = require('../../src/ethereum/build/Compaign.json');
const { AbiItem } = require('web3-utils');

const web3 = new Web3(ganache.provider());
const factoryAbi = compiledFactory.abi;
const campaignAbi = compiledCampaign.abi;
const bytecode = compiledFactory.evm.bytecode.object;

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(factoryAbi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 6500000 });

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '5000000',
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  campaign = await new web3.eth.Contract(campaignAbi, campaignAddress);
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1],
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1],
    });

    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000',
      });
    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy batteries', request.description);
  });

  it('approve request', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1],
    });

    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000',
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[1],
      gas: '1000000',
    });
    const request = await campaign.methods.requests(0).call();
    assert.equal(1, request.approvalCount);
  });

  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: web3.utils.toWei('10', 'ether'),
    });

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[2])
      .send({ from: accounts[0], gas: '1000000' });

    await campaign.methods.approveRequest(0).send({
      from: accounts[1],
      gas: '1000000',
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    });

    let balance = await web3.eth.getBalance(accounts[2]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    assert(balance > 104);
  });
});
