function defaultConfig(dataX: number[]) {
  return {
    title: {
      text: "学员列表参数图",
    },
    tooltip: {},
    xAxis: {
      data: [
        "应考人数",
        "签到人数",
        "实考人数",
        "考核中",
        "分配试卷人数",
        "答题中",
        "完成考试",
        "未签到",
        "未考核",
        "合格人数",
      ],
      axisLabel: {
        show: true, // 确保标签显示
        rotate: 0, // 调整标签角度，避免重叠
        interval: 0, // 显示所有标签
      },
    },
    yAxis: {},
    series: [
      {
        name: "学生数",
        type: "bar",
        data: transformArrayToObjects(dataX),
      },
    ],
  };
}

function transformArrayToObjects(
  data: number[]
): { value: number; itemStyle: { color: string } }[] {
  // 定义颜色数组
  const colors = [
    "#73b3fb",
    "#64c6e0",
    "#9a2445",
    "#2b61c6",
    "#40c0cc",
    "#bb4f6c",
    "#73b3fb",
    "#64c6e0",
    "#9a2445",
    "#2b61c6",
  ];

  // 遍历数组并返回转换后的结果
  return data.map((value, index) => ({
    value, // 数组元素作为 value
    itemStyle: {
      color: colors[index], // 根据索引选择颜色
    },
  }));
}
export { defaultConfig };
