import { Button, Input } from "@cn/ui";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface HeadersFormProps {
  headers: Record<string, string>;
  onUpdate: (headers: Record<string, string>) => void;
}

type HeaderEntry = [string, string];

export function HeadersForm({ headers, onUpdate }: HeadersFormProps) {
  const [localHeaders, setLocalHeaders] = useState<HeaderEntry[]>([]);

  useEffect(() => {
    setLocalHeaders(Object.entries(headers));
  }, [headers]);

  const handleInputChange = useCallback(
    (index: number, isKey: boolean, value: string) => {
      setLocalHeaders((prevHeaders) =>
        prevHeaders.map((header, idx) =>
          idx === index
            ? isKey
              ? [value, header[1]]
              : [header[0], value]
            : header,
        ),
      );
    },
    [],
  );

  const handleAddHeader = useCallback(() => {
    setLocalHeaders((prevHeaders) => [...prevHeaders, ["", ""]]);
  }, []);

  const handleRemoveHeader = useCallback((index: number) => {
    setLocalHeaders((prevHeaders) =>
      prevHeaders.filter((_, idx) => idx !== index),
    );
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newHeaders = Object.fromEntries(
        localHeaders.filter(([key]) => key !== ""),
      );
      onUpdate(newHeaders);
    },
    [localHeaders, onUpdate],
  );

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">Headers</label>
      {localHeaders.map(([key, value], index) => (
        <div
          key={index}
          className="flex items-center gap-2"
        >
          <Input
            placeholder="Key"
            value={key}
            onChange={(e) => handleInputChange(index, true, e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Value"
            value={value}
            onChange={(e) => handleInputChange(index, false, e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            size="sm"
            className="w-min"
            variant="ghost"
            onClick={() => handleRemoveHeader(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={handleAddHeader}
      >
        Add Header
      </Button>
    </div>
  );
}
