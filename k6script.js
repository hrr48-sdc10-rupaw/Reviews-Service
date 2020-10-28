import http from 'k6/http';

export let options = {
    scenarios: {
        constant_request_rate: {
            executor: 'constant-arrival-rate',
            rate: 1000,
            timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
            duration: '60s',
            preAllocatedVUs: 100, // how large the initial pool of VUs would be
            maxVUs: 500, // if the preAllocatedVUs are not enough, we can initialize more
        }
    }
};

export default function () {
    // GET Request
    http.get('http://localhost:3003/moist-air/reviews/?gameId=1');

    // POST Request
    // let payload = JSON.stringify({
    //   userId: 1,
    //   body: 'body test',
    //   recommended: true,
    //   time_played: 25,
    //   purchase_type: true
    // });
    // var params = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    // http.post('http://localhost:3003/moist-air/reviews/?gameId=1', payload, params);
}