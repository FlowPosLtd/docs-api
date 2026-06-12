import { memo, useState } from "react";
import type { Param } from "../types";

interface ParamTableProps {
  title: string;
  params: Param[];
  showBadges?: boolean;
}

function getParentKey(name: string): string | null {
  const m = name.match(/^([^[]+)\[\]\./);
  if (m) return m[1];
  const dot = name.indexOf(".");
  return dot > -1 ? name.substring(0, dot) : null;
}

function getChildDisplayName(name: string): string {
  const m = name.match(/^[^[]+\[\]\.(.+)$/);
  if (m) return m[1];
  const dot = name.indexOf(".");
  return dot > -1 ? name.substring(dot + 1) : name;
}

interface ParamGroup {
  param: Param;
  childParams: Param[];
  synthetic: boolean;
}

function buildGroups(params: Param[]): ParamGroup[] {
  const groups: ParamGroup[] = [];
  const indexMap = new Map<string, number>();

  for (const p of params) {
    const parentKey = getParentKey(p.name);
    if (!parentKey) {
      indexMap.set(p.name, groups.length);
      groups.push({ param: p, childParams: [], synthetic: false });
    } else {
      const idx = indexMap.get(parentKey);
      if (idx !== undefined) {
        groups[idx].childParams.push(p);
      } else {
        const isArray = /^[^[]+\[\]\./.test(p.name);
        const synthetic: Param = {
          name: parentKey,
          type: isArray ? "object[]" : "object",
          required: false,
          description: "",
        };
        indexMap.set(parentKey, groups.length);
        groups.push({ param: synthetic, childParams: [p], synthetic: true });
      }
    }
  }

  return groups;
}

function ParamRow({
  param,
  childParams,
  isChild,
  synthetic,
  showBadges,
  depth,
}: {
  param: Param;
  childParams: Param[];
  isChild: boolean;
  synthetic: boolean;
  showBadges: boolean;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);
  const displayName = isChild ? getChildDisplayName(param.name) : param.name;
  const hasChildren = childParams.length > 0;
  const level = depth ?? 0;

  return (
    <>
      <div
        className={`px-4 py-3.5 ${level > 0 ? "bg-gray-50 dark:bg-gray-900/40" : "bg-canvas"}`}
        style={level > 0 ? { paddingLeft: `${16 + level * 12}px` } : undefined}
      >
        {/* Name + type + badges — all inline like Stripe */}
        <div className="flex items-baseline gap-2 flex-wrap mb-1.5">
          <code className="text-[13px] font-mono font-bold text-ink-primary">
            {displayName}
          </code>
          <span className="text-[11px] font-mono text-ink-tertiary">{param.type}</span>
          {param.nullable && (
            <span className="text-[10px] text-ink-tertiary">nullable</span>
          )}
          {param.default && (
            <span className="text-[10px] text-ink-tertiary">
              default: <code className="font-mono">{param.default}</code>
            </span>
          )}
          {showBadges && !synthetic && (
            param.required ? (
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                required
              </span>
            ) : (
              <span className="text-[10px] font-medium text-gray-400 dark:text-gray-600 uppercase tracking-wide">
                optional
              </span>
            )
          )}
        </div>

        {/* Description */}
        {param.description && (
          <p className="text-[13px] text-ink-secondary leading-relaxed mb-1.5">
            {param.description}
          </p>
        )}

        {/* Enum chips */}
        {param.enum && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {param.enum.map((v) => (
              <code
                key={v}
                className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                {v}
              </code>
            ))}
          </div>
        )}

        {/* Example */}
        {showBadges && param.example && (
          <p className="text-[11px] text-ink-tertiary">
            Example: <code className="font-mono">{param.example}</code>
          </p>
        )}

        {/* Show child parameters button — Stripe style */}
        {hasChildren && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
            style={{
              border: "1px solid rgba(100,100,100,0.25)",
              color: open ? "#6b7280" : "#374151",
              background: open
                ? "rgba(0,0,0,0.04)"
                : "rgba(0,0,0,0.02)",
            }}
          >
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[11px] font-bold"
              style={{ border: "1.5px solid currentColor", lineHeight: 1 }}
            >
              {open ? "−" : "+"}
            </span>
            <span className="dark:text-gray-300">
              {open ? "Hide" : "Show"} child parameters
            </span>
          </button>
        )}
      </div>

      {/* Child params — revealed on click */}
      {hasChildren && open && (
        <div className="border-t border-l-4 border-blue-400/30 dark:border-blue-500/30"
          style={{ borderLeftWidth: 3 }}>
          {childParams.map((child, i) => (
            <div
              key={child.name}
              className={i > 0 ? "border-t border-gray-100 dark:border-gray-800" : ""}
            >
              <ParamRow
                param={child}
                childParams={[]}
                isChild
                synthetic={false}
                showBadges={showBadges}
                depth={(level) + 1}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export const ParamTable = memo(function ParamTable({
  title,
  params,
  showBadges = true,
}: ParamTableProps) {
  if (!params.length) return null;
  const groups = buildGroups(params);

  return (
    <div className="mb-6">
      {title && <h4 className="t-caption mb-3">{title}</h4>}
      <div className="border border-line rounded-lg overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
        {groups.map((group) => (
          <ParamRow
            key={group.param.name}
            param={group.param}
            childParams={group.childParams}
            isChild={false}
            synthetic={group.synthetic}
            showBadges={showBadges}
            depth={0}
          />
        ))}
      </div>
    </div>
  );
});
