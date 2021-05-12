function triplet_with_smaller_sum(arr, target) {
    arr.sort((a,b) => a - b);
    const triplets = [];
    for(i=0; i<arr.length - 2; i++) {
        search_pair(arr, target - arr[i], i, triplets);
    }
    return triplets;
}

function search_pair(arr, target_sum, first, triplets) {
    let left= first + 1,
        right = arr.length - 1;
    while ((left < right)) {
        if (arr[left] + arr[right] < target_sum) { //found the triplet

            for(i=right; i>left; i--) {
                triplets.push([arr[first], arr[left], arr[i]]);
            }
            left += 1;
        } else {
            right -= 1; //we need a pair with a smaller sum
        }
    }
}