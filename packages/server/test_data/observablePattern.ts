interface Observer<T> {
  update(data: T): void;
}

class Observable<T> {
  private observers: Observer<T>[] = [];

  subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer.update(data));
  }
}

// Example usage:
class DataSource extends Observable<number> {
  private data: number = 0;

  getData(): number {
    return this.data;
  }

  setData(value: number): void {
    this.data = value;
    this.notify(this.data);
  }
}

class DataDisplay implements Observer<number> {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  update(data: number): void {
    console.log(`${this.id} received update: ${data}`);
  }
}

// Usage:
const source = new DataSource();
const display1 = new DataDisplay('Display 1');
const display2 = new DataDisplay('Display 2');

source.subscribe(display1);
source.subscribe(display2);

source.setData(42);
source.setData(100);

source.unsubscribe(display1);

source.setData(200);
