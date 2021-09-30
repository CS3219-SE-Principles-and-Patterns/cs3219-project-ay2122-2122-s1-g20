/* eslint-disable react/prop-types */
import { XCircleIcon } from "@heroicons/react/solid";

export default function ErrorMessage(props) {
  return (
    <div className="overflow-auto w-max top-20 p-4 rounded-md bg-red-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Error {props.authType}: {props.message}
          </h3>
        </div>
      </div>
    </div>
  );
}
