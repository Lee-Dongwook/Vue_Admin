import "vxe-table/lib/style.css";
import type { App } from "vue";

import { VXETable, Column, Grid, Pager, Select, Table } from "vxe-table";

VXETable.setConfig({});

export function useVxeTable(app: App) {
  app.use(Column).use(Grid).use(Pager).use(Select).use(Table);
}
