// Polynomial regression utilities for forecasting

export interface ForecastPoint {
  year: number;
  predicted: number;
  lowerCI: number;
  upperCI: number;
}

export interface RegressionResult {
  coefficients: number[];
  rSquared: number;
  standardError: number;
}

// Fit polynomial regression
export function polynomialRegression(
  x: number[],
  y: number[],
  degree: number
): RegressionResult {
  const n = x.length;
  
  // Build design matrix
  const X: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j <= degree; j++) {
      row.push(Math.pow(x[i], j));
    }
    X.push(row);
  }

  // Normal equations: (X'X)β = X'y
  const XtX: number[][] = [];
  const Xty: number[] = [];
  
  for (let i = 0; i <= degree; i++) {
    XtX[i] = [];
    Xty[i] = 0;
    for (let j = 0; j <= degree; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += X[k][i] * X[k][j];
      }
      XtX[i][j] = sum;
    }
    for (let k = 0; k < n; k++) {
      Xty[i] += X[k][i] * y[k];
    }
  }

  // Solve using Gaussian elimination
  const coefficients = gaussianElimination(XtX, Xty);

  // Calculate R² and standard error
  let ssRes = 0;
  let ssTot = 0;
  const yMean = y.reduce((a, b) => a + b, 0) / n;
  
  for (let i = 0; i < n; i++) {
    const predicted = predictValue(x[i], coefficients);
    ssRes += Math.pow(y[i] - predicted, 2);
    ssTot += Math.pow(y[i] - yMean, 2);
  }

  const rSquared = 1 - (ssRes / ssTot);
  const standardError = Math.sqrt(ssRes / (n - degree - 1));

  return { coefficients, rSquared, standardError };
}

function gaussianElimination(A: number[][], b: number[]): number[] {
  const n = A.length;
  const augmented = A.map((row, i) => [...row, b[i]]);

  // Forward elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
        maxRow = k;
      }
    }
    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

    // Eliminate column
    for (let k = i + 1; k < n; k++) {
      const factor = augmented[k][i] / augmented[i][i];
      for (let j = i; j <= n; j++) {
        augmented[k][j] -= factor * augmented[i][j];
      }
    }
  }

  // Back substitution
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = augmented[i][n];
    for (let j = i + 1; j < n; j++) {
      x[i] -= augmented[i][j] * x[j];
    }
    x[i] /= augmented[i][i];
  }

  return x;
}

export function predictValue(x: number, coefficients: number[]): number {
  let result = 0;
  for (let i = 0; i < coefficients.length; i++) {
    result += coefficients[i] * Math.pow(x, i);
  }
  return result;
}

export function forecast(
  historicalX: number[],
  historicalY: number[],
  futureX: number[],
  degree: number = 2
): { historical: ForecastPoint[]; future: ForecastPoint[]; model: RegressionResult } {
  const model = polynomialRegression(historicalX, historicalY, degree);
  const zScore = 1.96; // 95% confidence interval

  const historical: ForecastPoint[] = historicalX.map(x => {
    const predicted = predictValue(x, model.coefficients);
    const margin = zScore * model.standardError;
    return {
      year: x,
      predicted,
      lowerCI: predicted - margin,
      upperCI: predicted + margin
    };
  });

  const future: ForecastPoint[] = futureX.map(x => {
    const predicted = predictValue(x, model.coefficients);
    const margin = zScore * model.standardError * (1 + (x - Math.max(...historicalX)) * 0.1); // Wider CI for future
    return {
      year: x,
      predicted,
      lowerCI: predicted - margin,
      upperCI: predicted + margin
    };
  });

  return { historical, future, model };
}

export function calculateCAGR(startValue: number, endValue: number, years: number): number {
  return Math.pow(endValue / startValue, 1 / years) - 1;
}

export function downloadCSV(data: any[], filename: string) {
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => row[h]).join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
