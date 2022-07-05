## API Manager

api manager is an improvement wrapper of polkadot api which support measure endpoints speed, monitor connection status.

### Initizlize
initizlize params
| name | type | description |
|--|--|--|
| name | string | the chain's name |
| endpoints | [string] \| { name: string, endpoint: string }[] | endpoints config |
| firstEndpoint | string | 
| options | object \| (options) => options | custom api options when create polkadot api |
| isRelayChain | boolean | the chain is realy chain |
| parachainId | number | parachain id, ignored when the chain is relaychain |
| autoRetry | number | auto retry when no response after `autoRetry` |
| timeout | number | throw error when no response after `timeout` |

```javascript
const wrapper = new ApiWrapper({
  name: ACALA,
  endpoints: [ENDPOINT_1, ENDPOINT_2, ENDPOINT_3],
  options: customOptions,
  isRelayChain: false,
  parachainId: 2000,
  autoRetry: 5 * SECOND,
  timeout: 60 * SECOND
});
```

### Get Api Instance
support two types of api: **API_PROMISE** and **API_RX**
```javascript
const apiRx = wrapper.getApiRx();

const apiPromise = wrapper.getApiPromise();
```

### Subscribe Endpoints Reports
```javascript
wrapper.endpointsReports$.subscribe({
  next: (reports) => {
    reports.forEach((item) => {
      console.log(item.name)
      console.log(item.endpoint)
      console.log(item.status)
      console.log(item.time.connect)
    })
  }
})
```

### Get Connected Endpoint
```javascript
wrapper.endpoint$.subscribe({
  next: (endpoint) => {
    console.log(endpoint.name);
    console.log(endpoint.endpoint);

    endpoint.status$.subscribe({
      next: (status) => {
        console.log(status)
      }
    })
  }
})
```

### Manual Connect
```javascript
wrapper.connect().subscribe({
  next: () => {
    console.log(`${wrapper.name} connected.`);
  }
})
```

### Manual Discount
```javascript
wrapper.discount().subscribe({
  next: () => {
    console.log(`${wrapper.name} discounted.`);
  }
})
```

### Api Manager