<script setup lang="ts">
import demoData from "./dataTurbo.json";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";

import LogicFlow from "@logicflow/core";
import { ref, unref, onMounted } from "vue";
import { BpmnNode } from "@/components/ReFlowChart/src/config";
import { Snapshot, BpmnElement, Menu } from "@logicflow/extension";
import { Control, NodePanel, DataDialog } from "@/components/ReFlowChart";
import { toLogicflowData } from "@/components/ReFlowChart/src/adpterForTurbo";
</script>
