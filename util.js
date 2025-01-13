

// 1. Depth First Search (DFS)
function dfs(graph, start) {
  const visited = new Set();
  function explore(node) {
    if (visited.has(node)) return;
    visited.add(node);
    for (const neighbor of graph[node]) {
      explore(neighbor);
    }
  }
  explore(start);
}

// Example usage:
const graph1 = {
  0: [1, 2],
  1: [3, 4],
  2: [5],
  3: [],
  4: [5],
  5: []
};
dfs(graph1, 0);

// 2. Breadth First Search (BFS)
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// Example usage:
bfs(graph1, 0);

// 3. Dijkstra's Algorithm
class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(priority, item) {
    this.elements.push({ priority, item });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift().item;
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

function dijkstra(graph, start) {
  const distances = {};
  const pq = new PriorityQueue();
  pq.enqueue(0, start);

  for (const node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  while (!pq.isEmpty()) {
    const currentNode = pq.dequeue();

    for (const [neighbor, weight] of Object.entries(graph[currentNode])) {
      const newDist = distances[currentNode] + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.enqueue(newDist, neighbor);
      }
    }
  }

  return distances;
}

// Example usage:
const weightedGraph = {
  A: { B: 1, C: 4 },
  B: { A: 1, C: 2, D: 5 },
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 }
};
console.log(dijkstra(weightedGraph, 'A'));

// 4. Bellman-Ford Algorithm
function bellmanFord(graph, start) {
  const distances = {};
  for (const node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  const edges = [];
  for (const [node, neighbors] of Object.entries(graph)) {
    for (const [neighbor, weight] of Object.entries(neighbors)) {
      edges.push([node, neighbor, weight]);
    }
  }

  for (let i = 0; i < Object.keys(graph).length - 1; i++) {
    for (const [u, v, w] of edges) {
      if (distances[u] + w < distances[v]) {
        distances[v] = distances[u] + w;
      }
    }
  }

  return distances;
}

// Example usage:
console.log(bellmanFord(weightedGraph, 'A'));

// 5. Floyd-Warshall Algorithm
function floydWarshall(graph) {
  const nodes = Object.keys(graph);
  const distances = {};

  for (const node of nodes) {
    distances[node] = {};
    for (const neighbor of nodes) {
      if (node === neighbor) distances[node][neighbor] = 0;
      else if (graph[node][neighbor] !== undefined) distances[node][neighbor] = graph[node][neighbor];
      else distances[node][neighbor] = Infinity;
    }
  }

  for (const k of nodes) {
    for (const i of nodes) {
      for (const j of nodes) {
        distances[i][j] = Math.min(distances[i][j], distances[i][k] + distances[k][j]);
      }
    }
  }

  return distances;
}

// Example usage:
console.log(floydWarshall(weightedGraph));



// 6. Prim's Algorithm
function primsAlgorithm(graph) {
  const nodes = Object.keys(graph);
  const mst = [];
  const visited = new Set();
  const edges = [];

  const startNode = nodes[0];
  visited.add(startNode);

  for (const [neighbor, weight] of Object.entries(graph[startNode])) {
    edges.push([startNode, neighbor, weight]);
  }

  while (edges.length > 0) {
    edges.sort((a, b) => a[2] - b[2]); // Sort by weight
    const [from, to, weight] = edges.shift();

    if (visited.has(to)) continue;

    visited.add(to);
    mst.push([from, to, weight]);

    for (const [neighbor, weight] of Object.entries(graph[to])) {
      if (!visited.has(neighbor)) {
        edges.push([to, neighbor, weight]);
      }
    }
  }

  return mst;
}

// Example usage:
const weightedGraph2 = {
  A: { B: 1, C: 4 },
  B: { A: 1, C: 2, D: 5 },
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 }
};
console.log(primsAlgorithm(weightedGraph2));

// 7. Kruskal's Algorithm
class DisjointSet {
  constructor() {
    this.parent = {};
  }

  find(node) {
    if (!this.parent[node]) this.parent[node] = node;
    if (this.parent[node] === node) return node;
    return (this.parent[node] = this.find(this.parent[node]));
  }

  union(node1, node2) {
    const root1 = this.find(node1);
    const root2 = this.find(node2);
    if (root1 !== root2) this.parent[root2] = root1;
  }
}

function kruskalAlgorithm(graph) {
  const edges = [];
  for (const [node, neighbors] of Object.entries(graph)) {
    for (const [neighbor, weight] of Object.entries(neighbors)) {
      edges.push([node, neighbor, weight]);
    }
  }

  edges.sort((a, b) => a[2] - b[2]);
  const ds = new DisjointSet();
  const mst = [];

  for (const [node1, node2, weight] of edges) {
    if (ds.find(node1) !== ds.find(node2)) {
      ds.union(node1, node2);
      mst.push([node1, node2, weight]);
    }
  }

  return mst;
}

// Example usage:
console.log(kruskalAlgorithm(weightedGraph2));

// 8. Topological Sort
function topologicalSort(graph) {
  const visited = new Set();
  const stack = [];

  function dfs(node) {
    if (visited.has(node)) return;
    visited.add(node);
    for (const neighbor of graph[node]) {
      dfs(neighbor);
    }
    stack.push(node);
  }

  for (const node in graph) {
    dfs(node);
  }

  return stack.reverse();
}

// Example usage:
const directedGraph = {
  A: ["B", "C"],
  B: ["D"],
  C: ["D"],
  D: []
};
console.log(topologicalSort(directedGraph));

// 9. Union-Find (Disjoint Set)
class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX] += 1;
      }
    }
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Example usage:
const uf = new UnionFind(10);
uf.union(1, 2);
uf.union(2, 3);
console.log(uf.connected(1, 3)); // true
console.log(uf.connected(1, 4)); // false

// 10. Subset Sum Problem (Dynamic Programming)
function subsetSum(arr, sum) {
  const n = arr.length;
  const dp = Array.from({ length: n + 1 }, () => Array(sum + 1).fill(false));

  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= sum; j++) {
      if (arr[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - arr[i - 1]];
      }
    }
  }

  return dp[n][sum];
}

// Example usage:
console.log(subsetSum([3, 34, 4, 12, 5, 2], 9)); // true
console.log(subsetSum([3, 34, 4, 12, 5, 2], 30)); // false

// 11. Knapsack Problem (0/1 Knapsack)
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

// Example usage:
console.log(knapsack([1, 2, 3], [60, 100, 120], 5)); // 220



// 12. Longest Increasing Subsequence (LIS)
function longestIncreasingSubsequence(arr) {
  const dp = Array(arr.length).fill(1);

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

// Example usage:
console.log(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18])); // 4

// 13. Levenshtein Distance (Edit Distance)
function levenshteinDistance(str1, str2) {
  const dp = Array.from({ length: str1.length + 1 }, () => Array(str2.length + 1).fill(0));

  for (let i = 0; i <= str1.length; i++) {
    for (let j = 0; j <= str2.length; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[str1.length][str2.length];
}

// Example usage:
console.log(levenshteinDistance("kitten", "sitting")); // 3

// 14. Segment Tree
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = Array(4 * this.n).fill(0);
    this.build(arr, 0, 0, this.n - 1);
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      this.build(arr, 2 * node + 1, start, mid);
      this.build(arr, 2 * node + 2, mid + 1, end);
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
  }

  update(idx, value, node, start, end) {
    if (start === end) {
      this.tree[node] = value;
    } else {
      const mid = Math.floor((start + end) / 2);
      if (idx <= mid) {
        this.update(idx, value, 2 * node + 1, start, mid);
      } else {
        this.update(idx, value, 2 * node + 2, mid + 1, end);
      }
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
  }

  query(l, r, node, start, end) {
    if (r < start || l > end) {
      return 0;
    }
    if (l <= start && end <= r) {
      return this.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    const leftSum = this.query(l, r, 2 * node + 1, start, mid);
    const rightSum = this.query(l, r, 2 * node + 2, mid + 1, end);
    return leftSum + rightSum;
  }
}

// Example usage:
const arr = [1, 2, 3, 4, 5];
const segmentTree = new SegmentTree(arr);
console.log(segmentTree.query(1, 3, 0, 0, arr.length - 1)); // 9 (2+3+4)
segmentTree.update(2, 10, 0, 0, arr.length - 1);
console.log(segmentTree.query(1, 3, 0, 0, arr.length - 1)); // 16 (2+10+4)




// 15. Quick Sort
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage:
console.log(quickSort([3, 6, 8, 10, 1, 2, 1])); // [1, 1, 2, 3, 6, 8, 10]

// 16. Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Example usage:
console.log(mergeSort([3, 6, 8, 10, 1, 2, 1])); // [1, 1, 2, 3, 6, 8, 10]

// 17. Binary Search
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// Example usage:
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 4)); // 3
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 8)); // -1

// 18. Heap Sort
function heapSort(arr) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// Example usage:
console.log(heapSort([3, 6, 8, 10, 1, 2, 1])); // [1, 1, 2, 3, 6, 8, 10]




// 19. Counting Sort
function countingSort(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const count = Array(max - min + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  let index = 0;
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      arr[index++] = i + min;
      count[i]--;
    }
  }

  return arr;
}

// Example usage:
console.log(countingSort([4, 2, 2, 8, 3, 3, 1])); // [1, 2, 2, 3, 3, 4, 8]

// 20. Radix Sort
function radixSort(arr) {
  const maxNum = Math.max(...arr) * 10;
  let divisor = 10;

  while (divisor < maxNum) {
    let buckets = [...Array(10)].map(() => []);

    for (let num of arr) {
      buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
    }

    arr = [].concat(...buckets);
    divisor *= 10;
  }

  return arr;
}

// Example usage:
console.log(radixSort([170, 45, 75, 90, 802, 24, 2, 66])); // [2, 24, 45, 66, 75, 90, 170, 802]

// 21. Bucket Sort
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) {
    return arr;
  }

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from({ length: Math.floor((max - min) / bucketSize) + 1 }, () => []);

  for (let i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - min) / bucketSize)].push(arr[i]);
  }

  return buckets.reduce((acc, bucket) => acc.concat(bucket.sort((a, b) => a - b)), []);
}

// Example usage:
console.log(bucketSort([29, 25, 3, 49, 9, 37, 21, 43])); // [3, 9, 21, 25, 29, 37, 43, 49]

// 22. Shell Sort
function shellSort(arr) {
  let gap = Math.floor(arr.length / 2);

  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      const temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }

  return arr;
}

// Example usage:
console.log(shellSort([12, 34, 54, 2, 3])); // [2, 3, 12, 34, 54]




// 23. Euclidean Algorithm (GCD)
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Example usage:
console.log(gcd(48, 18)); // 6

// 24. Extended Euclidean Algorithm
function extendedGcd(a, b) {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = extendedGcd(b, a % b);
  const x = y1;
  const y = x1 - Math.floor(a / b) * y1;
  return [g, x, y];
}

// Example usage:
console.log(extendedGcd(30, 20)); // [10, 1, -1]

// 25. Sieve of Eratosthenes
function sieveOfEratosthenes(n) {
  const primes = Array(n + 1).fill(true);
  primes[0] = primes[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }

  return primes.map((isPrime, num) => isPrime ? num : null).filter(Boolean);
}

// Example usage:
console.log(sieveOfEratosthenes(30)); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

// 26. Modular Exponentiation
function modularExponentiation(base, exponent, mod) {
  let result = 1;
  base = base % mod;

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % mod;
    }
    exponent = Math.floor(exponent / 2);
    base = (base * base) % mod;
  }

  return result;
}

// Example usage:
console.log(modularExponentiation(2, 10, 1000)); // 24

// 27. Chinese Remainder Theorem (CRT)
function chineseRemainderTheorem(num, rem) {
  const prod = num.reduce((acc, val) => acc * val, 1);
  let result = 0;

  for (let i = 0; i < num.length; i++) {
    const pp = prod / num[i];
    result += rem[i] * modularInverse(pp, num[i]) * pp;
  }

  return result % prod;
}

function modularInverse(a, mod) {
  const [g, x] = extendedGcd(a, mod);
  if (g !== 1) throw new Error('Modular inverse does not exist');
  return (x % mod + mod) % mod;
}

// Example usage:
console.log(chineseRemainderTheorem([3, 4, 5], [2, 3, 1])); // 11



// JavaScript implementations of various competitive programming algorithms
// covering graph algorithms, dynamic programming, mathematical algorithms,
// sorting, data structures, and more.

// 28. Fermat's Little Theorem
function isPrimeFermat(n, k = 5) {
  if (n <= 1) return false;
  if (n <= 3) return true;

  for (let i = 0; i < k; i++) {
    const a = Math.floor(Math.random() * (n - 4)) + 2;
    if (modularExponentiation(a, n - 1, n) !== 1) return false;
  }

  return true;
}

// Example usage:
console.log(isPrimeFermat(97)); // true
console.log(isPrimeFermat(91)); // false

// 29. Manacher's Algorithm (Longest Palindromic Substring)
function manacher(s) {
  const T = `#${s.split('').join('#')}#`;
  const P = Array(T.length).fill(0);
  let center = 0, right = 0;

  for (let i = 1; i < T.length - 1; i++) {
    const mirror = 2 * center - i;

    if (right > i) {
      P[i] = Math.min(right - i, P[mirror]);
    }

    while (T[i + (1 + P[i])] === T[i - (1 + P[i])]) {
      P[i]++;
    }

    if (i + P[i] > right) {
      center = i;
      right = i + P[i];
    }
  }

  let maxLen = 0;
  let centerIndex = 0;
  for (let i = 1; i < P.length - 1; i++) {
    if (P[i] > maxLen) {
      maxLen = P[i];
      centerIndex = i;
    }
  }

  const start = (centerIndex - maxLen) / 2;
  return s.substring(start, start + maxLen);
}

// Example usage:
console.log(manacher("babad")); // "bab" or "aba"

// 30. KMP Algorithm (Knuth-Morris-Pratt)
function kmpSearch(text, pattern) {
  const lps = computeLPSArray(pattern);
  let i = 0;
  let j = 0;

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      console.log("Found pattern at index", i - j);
      j = lps[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
}

function computeLPSArray(pattern) {
  const lps = Array(pattern.length).fill(0);
  let length = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

// Example usage:
kmpSearch("abxabcabcaby", "abcaby"); // Found pattern at index 6


// JavaScript implementations of various competitive programming algorithms
// covering graph algorithms, dynamic programming, mathematical algorithms,
// sorting, data structures, and more.

// 31. Rabin-Karp Algorithm
function rabinKarp(text, pattern) {
  const d = 256;
  const q = 101;
  const m = pattern.length;
  const n = text.length;
  let p = 0; // hash value for pattern
  let t = 0; // hash value for text
  let h = 1;

  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }

  for (let i = 0; i < m; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }

  for (let i = 0; i <= n - m; i++) {
    if (p === t) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) console.log("Pattern found at index", i);
    }
    if (i < n - m) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (t < 0) t = (t + q);
    }
  }
}

// Example usage:
rabinKarp("GEEKS FOR GEEKS", "GEEK"); // Pattern found at index 0, 10

// 32. Z Algorithm
function zAlgorithm(s) {
  const Z = Array(s.length).fill(0);
  let left = 0, right = 0;

  for (let i = 1; i < s.length; i++) {
    if (i > right) {
      left = right = i;
      while (right < s.length && s[right] === s[right - left]) {
        right++;
      }
      Z[i] = right - left;
      right--;
    } else {
      const k = i - left;
      if (Z[k] < right - i + 1) {
        Z[i] = Z[k];
      } else {
        left = i;
        while (right < s.length && s[right] === s[right - left]) {
          right++;
        }
        Z[i] = right - left;
        right--;
      }
    }
  }

  return Z;
}

// Example usage:
console.log(zAlgorithm("aaabcxyzaaaabczaaczabbaaaaaabc"));

// 33. Boyer-Moore Algorithm
function boyerMoore(text, pattern) {
  const badChar = Array(256).fill(-1);

  for (let i = 0; i < pattern.length; i++) {
    badChar[pattern.charCodeAt(i)] = i;
  }

  let s = 0;
  while (s <= text.length - pattern.length) {
    let j = pattern.length - 1;

    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }

    if (j < 0) {
      console.log("Pattern found at index", s);
      s += (s + pattern.length < text.length) ? pattern.length - badChar[text.charCodeAt(s + pattern.length)] : 1;
    } else {
      s += Math.max(1, j - badChar[text.charCodeAt(s + j)]);
    }
  }
}

// Example usage:
boyerMoore("ABAAABCD", "ABC"); // Pattern found at index 4


// JavaScript implementations of various competitive programming algorithms
// covering graph algorithms, dynamic programming, mathematical algorithms,
// sorting, data structures, and more.

// 34. Tarjan's Algorithm (Strongly Connected Components)
function tarjansSCC(graph) {
  let index = 0;
  const stack = [];
  const indices = {};
  const lowLinks = {};
  const onStack = {};
  const sccs = [];

  function strongConnect(v) {
    indices[v] = lowLinks[v] = index++;
    stack.push(v);
    onStack[v] = true;

    for (const w of graph[v]) {
      if (indices[w] === undefined) {
        strongConnect(w);
        lowLinks[v] = Math.min(lowLinks[v], lowLinks[w]);
      } else if (onStack[w]) {
        lowLinks[v] = Math.min(lowLinks[v], indices[w]);
      }
    }

    if (lowLinks[v] === indices[v]) {
      const scc = [];
      let w;
      do {
        w = stack.pop();
        onStack[w] = false;
        scc.push(w);
      } while (w !== v);
      sccs.push(scc);
    }
  }

  for (const v in graph) {
    if (indices[v] === undefined) {
      strongConnect(v);
    }
  }

  return sccs;
}

// Example usage:
const graph = {
  0: [1],
  1: [2],
  2: [0, 3],
  3: [4],
  4: [5, 6],
  5: [3, 7],
  6: [7],
  7: [8],
  8: [6]
};
console.log(tarjansSCC(graph));

// 35. Floyd-Warshall Algorithm (All-Pairs Shortest Paths)
function floydWarshall(graph) {
  const dist = {};
  for (const u in graph) {
    dist[u] = {};
    for (const v in graph) {
      if (u === v) dist[u][v] = 0;
      else if (graph[u][v] !== undefined) dist[u][v] = graph[u][v];
      else dist[u][v] = Infinity;
    }
  }

  for (const k in graph) {
    for (const i in graph) {
      for (const j in graph) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return dist;
}

// Example usage:
const weightedGraph22 = {
  A: { B: 3, C: 8, D: -4 },
  B: { A: Infinity, C: 1, D: 7 },
  C: { A: 4, B: Infinity, D: Infinity },
  D: { A: 2, B: Infinity, C: 5 }
};
console.log(floydWarshall(weightedGraph22));


// JavaScript implementations of various competitive programming algorithms
// covering graph algorithms, dynamic programming, mathematical algorithms,
// sorting, data structures, and more.

// 36. Bellman-Ford Algorithm
function bellmanFord(graph, start) {
  const distance = {};
  const nodes = Object.keys(graph);

  nodes.forEach(node => {
    distance[node] = Infinity;
  });
  distance[start] = 0;

  for (let i = 0; i < nodes.length - 1; i++) {
    for (const [node, neighbors] of Object.entries(graph)) {
      for (const [neighbor, weight] of Object.entries(neighbors)) {
        if (distance[node] + weight < distance[neighbor]) {
          distance[neighbor] = distance[node] + weight;
        }
      }
    }
  }

  // Check for negative-weight cycles
  for (const [node, neighbors] of Object.entries(graph)) {
    for (const [neighbor, weight] of Object.entries(neighbors)) {
      if (distance[node] + weight < distance[neighbor]) {
        console.error("Graph contains a negative-weight cycle");
        return;
      }
    }
  }

  return distance;
}

// Example usage:
const bellmanGraph = {
  A: { B: -1, C: 4 },
  B: { C: 3, D: 2, E: 2 },
  C: {},
  D: { B: 1, C: 5 },
  E: { D: -3 }
};
console.log(bellmanFord(bellmanGraph, 'A'));

// 38. Topological Sort (Kahn's Algorithm)
function kahnsTopologicalSort(graph) {
  const inDegree = {};
  const queue = [];
  const topOrder = [];

  for (const node in graph) {
    inDegree[node] = 0;
  }

  for (const node in graph) {
    for (const neighbor of graph[node]) {
      inDegree[neighbor]++;
    }
  }

  for (const node in inDegree) {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  }

  while (queue.length > 0) {
    const currentNode = queue.shift();
    topOrder.push(currentNode);

    for (const neighbor of graph[currentNode]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (topOrder.length !== Object.keys(graph).length) {
    console.error("Graph has a cycle, topological sorting not possible");
    return [];
  }

  return topOrder;
}

// Example usage:
const directedAcyclicGraph = {
  5: [2, 0],
  4: [0, 1],
  3: [1],
  2: [3],
  1: [],
  0: []
};
console.log(kahnsTopologicalSort(directedAcyclicGraph)); // [5, 4, 2, 3, 1, 0]

// 39. Longest Common Subsequence (LCS)
function longestCommonSubsequence(str1, str2) {
  const dp = Array(str1.length + 1)
    .fill(null)
    .map(() => Array(str2.length + 1).fill(0));

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[str1.length][str2.length];
}

// Example usage:
console.log(longestCommonSubsequence("AGGTAB", "GXTXAYB")); // 4

// 40. Maximum Subarray Sum (Kadane's Algorithm)
function kadane(arr) {
  let maxCurrent = arr[0];
  let maxGlobal = arr[0];

  for (let i = 1; i < arr.length; i++) {
    maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent;
    }
  }

  return maxGlobal;
}

// Example usage:
console.log(kadane([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6

// More algorithms to come...
// JavaScript implementations of various competitive programming algorithms
// covering graph algorithms, dynamic programming, mathematical algorithms,
// sorting, data structures, and more.

// 41. Trie (Prefix Tree)
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}

// Example usage:
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple")); // true
console.log(trie.search("app")); // false
console.log(trie.startsWith("app")); // true
trie.insert("app");
console.log(trie.search("app")); // true

// 42. Fenwick Tree (Binary Indexed Tree)
class FenwickTree {
  constructor(size) {
    this.tree = Array(size + 1).fill(0);
  }

  update(index, value) {
    while (index < this.tree.length) {
      this.tree[index] += value;
      index += index & -index;
    }
  }

  query(index) {
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }
    return sum;
  }
}

// Example usage:
const fenwick = new FenwickTree(10);
fenwick.update(3, 5);
fenwick.update(5, 2);
console.log(fenwick.query(5)); // 7
console.log(fenwick.query(3)); // 5

// 43. Disjoint Set Union (Union-Find with Path Compression)
class DisjointSetUnion {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}

// Example usage:
const dsu = new DisjointSetUnion(10);
dsu.union(1, 2);
dsu.union(3, 4);
console.log(dsu.find(1) === dsu.find(2)); // true
console.log(dsu.find(1) === dsu.find(3)); // false

// More algorithms to come...
