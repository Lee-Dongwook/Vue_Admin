export function useColumns() {
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { version, engines } = pkg;
  const columns = [
    {
      label: "현재 버전",
      minWidth: 100,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="!text-base">
            {version}
          </el-tag>
        );
      }
    },
    {
      label: "마지막 컴파일 시간",
      minWidth: 120,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="!text-base">
            {lastBuildTime}
          </el-tag>
        );
      }
    },
    {
      label: "권장 node 버전",
      minWidth: 140,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="!text-base">
            {engines.node}
          </el-tag>
        );
      }
    },
    {
      label: "권장 pnpm 버전",
      minWidth: 140,
      cellRenderer: () => {
        return (
          <el-tag size="large" class="!text-base">
            {engines.pnpm}
          </el-tag>
        );
      }
    },
    {
      label: "정식 버전 코드 주소",
      minWidth: 140,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a
            href="https://github.com/pure-admin/vue-pure-admin"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">
              정식 버전 코드 링크
            </span>
          </a>
        );
      }
    },
    {
      label: "Lite 버전 코드 주소",
      minWidth: 140,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a
            href="https://github.com/pure-admin/pure-admin-thin"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">
              Lite 버전 코드 링크
            </span>
          </a>
        );
      }
    },
    {
      label: "문서 주소",
      minWidth: 100,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a href="https://pure-admin.cn/" target="_blank">
            <span style="color: var(--el-color-primary)">문서링크</span>
          </a>
        );
      }
    },
    {
      label: "미리보기 링크",
      minWidth: 100,
      className: "pure-version",
      cellRenderer: () => {
        return (
          <a href="https://pure-admin.github.io/vue-pure-admin" target="_blank">
            <span style="color: var(--el-color-primary)">미리보기 링크</span>
          </a>
        );
      }
    }
  ];

  return {
    columns
  };
}
