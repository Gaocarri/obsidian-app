function clone<T>(data: T): T { // data什么类型返回什么类型
  return JSON.parse(JSON.stringify(data))
}

export default clone