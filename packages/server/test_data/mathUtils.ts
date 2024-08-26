export function calculateFactorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  return n * calculateFactorial(n - 1);
}

export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

export function fibonacciSequence(n: number): number[] {
  const sequence: number[] = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}
