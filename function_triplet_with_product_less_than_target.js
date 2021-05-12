const Deque = require('./collections/deque');

function find_subarrays(arr, target) {
    let result = [],
        product = 1,
        left = 0;
    for(let right = 0; right < arr.length; right++) {
        product *= arr[right];
        while((product >= target && left < arr.length)) {
            product /= arr[left];
            left += 1;
        }
        // since the product of all numbers from left to right is less than the target therefore,
        // all subarrays from left to tright will have a product less than the target too; to avoid
        // duplicates, we will start witha  subarray containing only arr[]rigth] and then extend it
        const tempList = new Deque();
        for(let i = right; i > left - 1; i--) {
            tempList.unshift(arr[i]);
            result.push(tempList.toArray());
        }
    }
    return result;
}

// Time complexity - O(N^3)
// Space complexity - O(N)