class Ctx {
  private data: Record<string, any> = {};

  // 存储数据
  set(key: string, value: any): void {
    this.data[key] = value;
  }

  // 获取数据
  get(key: string): any {
    return this.data[key];
  }

  // 删除数据
  delete(key: string): void {
    delete this.data[key];
  }

  clear(): void {
    this.data = {};
  }
}

export default new Ctx();
