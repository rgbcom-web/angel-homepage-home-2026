import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { inputClassName } from "./input";
import { FormControl } from "./form";
import { Button } from "./button";
import { convertFileSize } from "@/shared/lib/files.utils";

const FileInput = React.forwardRef(({ className, noFormControl, value, ...props }, ref) => {
  const [fileInfo, setFileInfo] = React.useState(null);
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    if (!value) {
      setFileInfo(null);
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileInfo({
        name: file.name,
        size: convertFileSize(file.size),
      });
      if (props.onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: file,
          },
        };
        props.onChange(syntheticEvent);
      }
    } else {
      setFileInfo(null);
      if (props.onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: undefined,
          },
        };
        props.onChange(syntheticEvent);
      }
    }
  };

  const cancelUpload = (e) => {
    e.preventDefault();

    setFileInfo(null);

    // 파일 input 요소의 value 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (props.onChange) {
      props.onChange({ target: { value: null } });
    }
  };

  const Comp = () => (
    <div className={cn("flex gap-2", "tablet:gap-1.5", "mobile:gap-1")}>
      <input
        type="file"
        className="hidden"
        ref={(el) => {
          fileInputRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        {...props}
        onChange={handleFileChange}
      />
      <div
        className={cn(
          inputClassName,
          "flex cursor-pointer items-center gap-2 border border-input bg-white",
          "tablet:h-auto",
        )}
        onClick={() => fileInputRef.current?.click()}>
        {fileInfo ? (
          <div className="flex w-full gap-2 text-dd-gray">
            <span className="line-clamp-1">{fileInfo.name}</span>
            <small className="flex-shrink-0">({fileInfo.size})</small>
          </div>
        ) : (
          <span className="text-dd-gray-light mobile:hidden">파일을 업로드 해주세요.</span>
        )}
      </div>
      <Button
        type="button"
        variant="gray"
        size="lg"
        className={cn(
          "w-full max-w-[150px] flex-shrink-0 px-[1em] font-normal",
          "tablet:h-auto tablet:max-w-[100px]",
          "mobile:max-w-[80px] mobile:text-sm",
        )}
        onClick={() => fileInputRef.current?.click()}>
        찾아보기
      </Button>
      <Button
        type="button"
        variant="gray"
        size="lg"
        onClick={cancelUpload}
        className={cn("aspect-square w-auto flex-shrink-0 px-0 text-white")}>
        <TrashIcon className={cn("!h-5 !w-5")} />
      </Button>
    </div>
  );

  if (noFormControl) {
    return Comp();
  }

  return (
    <FormControl>
      <div>{Comp()}</div>
    </FormControl>
  );
});

FileInput.displayName = "FileInput";

function TrashIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="20"
      viewBox="0 0 14 20"
      className={className}>
      <path
        d="M12,17H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H12a2,2,0,0,1,2,2V15A2,2,0,0,1,12,17ZM10.889,3.238a.778.778,0,0,0-.778.778v8.969a.778.778,0,1,0,1.555,0V4.016A.778.778,0,0,0,10.889,3.238ZM7,3.238a.778.778,0,0,0-.778.778v8.969a.778.778,0,1,0,1.555,0V4.016A.778.778,0,0,0,7,3.238Zm-3.889,0a.778.778,0,0,0-.778.778v8.969a.778.778,0,1,0,1.555,0V4.016A.778.778,0,0,0,3.111,3.238Z"
        transform="translate(0 3)"
        fill="currentColor"
      />
      <path
        d="M8.333,2H.667a.666.666,0,1,1,0-1.333H4.723A1,1,0,0,1,5.666,0H8.333a1,1,0,0,1,.943.667h4.057a.666.666,0,1,1,0,1.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { FileInput };
