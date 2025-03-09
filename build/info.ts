import type { Plugin } from "vite";
import gradient from "gradient-string";
import { getPackageSize } from "./utils";
import dayjs, { type Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import boxen, { type Options as BoxenOptions } from "boxen";

dayjs.extend(duration);

const welcomeMessage = gradient(["cyan", "magenta"]).multiline(
  `안녕하세요! 어드민 프로젝트에 오신 것을 환영합니다.\n다음 두가지 문서를 준비하였습니다.\nhttps://pure-admin.cn\nhttps://pure-admin-utils.netlify.app`
);

const boxenOptions: BoxenOptions = {
  padding: 0.5,
  borderColor: "cyan",
  borderStyle: "round",
};

export function viteBuildInfo(): Plugin {
  let config: { command: string };
  let startTime: Dayjs;
  let endTime: Dayjs;
  let outDir: string;
  return {
    name: "vite:buildInfo",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      outDir = resolvedConfig.build?.outDir ?? "dist";
    },
    buildStart() {
      console.log(boxen(welcomeMessage, boxenOptions));
      if (config.command === "build") {
        startTime = dayjs(new Date());
      }
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(new Date());
        getPackageSize({
          folder: outDir,
          callback: (size: string) => {
            console.log(
              boxen(
                gradient(["cyan", "magenta"]).multiline(
                  `🎉 （총 소요 시간${dayjs
                    .duration(endTime.diff(startTime))
                    .format("mm분ss초")}，패키지 크기${size}）`
                ),
                boxenOptions
              )
            );
          },
        });
      }
    },
  };
}
