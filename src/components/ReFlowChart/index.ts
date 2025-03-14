import control from "./src/Control.vue";
import nodePanel from "./src/NodePanel.vue";
import dataDialog from "./src/DataDialog.vue";
import { withInstall } from "@pureadmin/utils";

const Control = withInstall(control);

const NodePanel = withInstall(nodePanel);

const DataDialog = withInstall(dataDialog);

export { Control, NodePanel, DataDialog };
