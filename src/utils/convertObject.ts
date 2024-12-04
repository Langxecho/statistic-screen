function convertQuizList(data: any) {
  const res: any = [];
//   console.log(data, "传入的转换源");
  data?.forEach((item: any) => {
    res.push(item.title);
  });
  return res;
}

function findQuizByName(name: string, data: any) {
    console.log(name);  // 打印查看传入的 data
    return data?.find((item: any) => {
      return item.title === name;  // 查找标题匹配的元素
    });
  }
  
export { convertQuizList, findQuizByName };
