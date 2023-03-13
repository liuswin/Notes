const r = 500;
const count = 48;
function generateRadianPoints(opt) {
  const defaultOpt = {
    r: 500,
    count: 36,
    startAngle: 0,
    endAngle: 360
  };
  if ((!(opt instanceof Object) && JSON.stringify(opt) === "{}") || !opt) {
    opt = defaultOpt;
  }
  const { r, count, startAngle, endAngle } = Object.assign(defaultOpt, opt);
  let points = new Array(count).fill(undefined);
  let d = 2 * r;
  let startRadian = startAngle * (Math.PI / 180);
  let endRadian = endAngle * (Math.PI / 180);
  let avgRadian = (endRadian - startRadian) / (count + 1);
  return points.map((item, index) => {
    return {
      x: +(Math.sin(startRadian + avgRadian * (index + 1)) * r).toFixed(2),
      y: +(Math.cos(startRadian + avgRadian * (index + 1)) * r).toFixed(2)
    };
  });
}

const points = generateRadianPoints({
  r: r,
  count: count,
  startAngle: 0,
  endAngle: 360
});

myChart.showLoading();
$.getJSON(ROOT_PATH + "/data/asset/data/les-miserables.json", function (graph) {
  myChart.hideLoading();

  graph.nodes.forEach(function (node, index) {
    node.label = {
        show: true,
        position: index < count/2 ? 'right' : 'left'
    };
    if ((index > 6 && index < 17) || (index > 30 && index < 41)) {
        node.symbolSize = 8;
    } else {
        node.symbolSize = 0;
        node.label = {
            show: false
        }
    }

    if (index < points.length) {
        node.x = points[index].x;
        node.y = points[index].y
    }
  });

  graph.data = graph.nodes.slice(0, points.length);

  option = {
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    // 坐标轴
    xAxis: {
        min: -r,
        max: r
    },
    yAxis: {
        min: -r,
        max: r
    },
    series: [
      {
        name: "Les Miserables",
        type: "graph",
        layout: "none",
        data: graph.data,
        roam: true,
        label: {
          position: "right",
          formatter: "{b}"
        },
        lineStyle: {
          color: "source",
          curveness: 0.3
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 10
          }
        }
      },
      {
          type: 'lines',
          data: [
            []
          ]
      }
    ]
  };

  myChart.setOption(option);
});

console.log(myChart.getOption());
