export class WebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log('WebSocket connection established');
        resolve();
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      this.socket.onmessage = (event) => {
        console.log('Received message:', event.data);
        // Handle incoming messages
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    });
  }

  send(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
