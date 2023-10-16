# Cause✌️Care: A Blockchain Based Charity App.

<p>Cause✌️Care is a Charity platform which NGOs can use for safeguarding the transactions and data related to their campaigns.</p>
<p>It uses Ethereum Blockchain under the hood for storing the data related to the NGO campaigns such as the campaign details and the Donation Funds made to those campaigns.</p>

## Features:-

### <strong>1. For NGOs:-</strong>
<ul>
    <li>
        <p>NGOs can register on the platform and will be verified by Government(admin) before they are able to create campaigns on the platform.</p>
    </li>
    <li>
        <p>NGOs can create, update, or delete their campaigns, the data related to the campaigns will be stored on the Blockchain.</p>
    </li>
    <li>
        <p>NGOs can track the status of their campaigns, like check the amount of funds received, the list of donors, etc.</p>
    </li>
    <li>
        <p>NGOs can upload relevant proof about their organization while registering to the platform which will be checked later by the Government(admin).
        </p>
    </li>
</ul>

### <strong>2. For Users:-</strong>

<ul>
    <li>
        <p>Users can connect to the application with their Metamask wallet which they can use for making donations to NGO campaigns.</p>
    </li>
    <li>
        <p>Users can browse campaigns from the list of available campaigns through the search bar provided.</p>
    </li>
    <li>
        <p>Users can view the campaign proof uploaded by NGOs and make donations by going to the campaigns details page.</p>
    </li>
</ul>

### <strong>3. For Government (Admin):-</strong>

<ul>
    <li>
        <p>Admin is provided with admin page where they can verify the NGOs who want to be a part of the platform.</p>
    </li>
    <li>
        <p>Admin can view the documents submitted by the NGO at the time of Registration.</p>
    </li>
    <li>
        <p>Admin can perform two actions:</p>
    </li>
      <ol>
          <li><p>Approving the NGO registration request.</p></li>
          <li><p>Rejecting the NGO registration request.</p></li>
      </ol>
</ul>

## Make Sure to do the following:-
- <p>Add local Hardhat (development) blockchain to your Metamask wallet.</p>
- <p>Add some of the accounts provided by hardhat to your Metamask wallet.</p>
- <p>Also make sure to go through the instructions.txt provided in the server directory</p>

## Scripts that you'll need:-

#### Client side scripts:- 

```
cd client
```

```
npm i

OR 

yarn install
```

- #### To spin up the development blockchain

```
npx hardhat node
```

- #### To deploy the smart contract on the Blockchain

```
npx hardhat run scripts/deploy.js
```

- To start the app 

```
yarn start

OR

npm run start
```

#### Server side scripts:- 

```
cd server
```

```
npm i 

OR 

yarn install
```

- #### To start the server 

```
yarn start 

OR

nodemon index.js
```

#### Admin side scripts:-

```
cd admin
```

```
npm i

OR 

yarn install
```

- #### To start the admin app

```
yarn run dev

OR

npm run dev
