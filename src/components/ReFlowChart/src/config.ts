export const nodeList = [
  {
    text: "시작",
    type: "start",
    class: "node-start"
  },
  {
    text: "구형",
    type: "rect",
    class: "node-rect"
  },
  {
    type: "user",
    text: "사용자",
    class: "node-user"
  },
  {
    type: "push",
    text: "push",
    class: "node-push"
  },
  {
    type: "download",
    text: "다운로드",
    class: "node-download"
  },
  {
    type: "end",
    text: "종료",
    class: "node-end"
  }
];

export const BpmnNode = [
  {
    type: "bpmn:startEvent",
    text: "시작",
    class: "bpmn-start"
  },
  {
    type: "bpmn:endEvent",
    text: "종료",
    class: "bpmn-end"
  },
  {
    type: "bpmn:exclusiveGateway",
    text: "게이트웨이",
    class: "bpmn-exclusiveGateway"
  },
  {
    type: "bpmn:userTask",
    text: "사용자",
    class: "bpmn-user"
  }
];
