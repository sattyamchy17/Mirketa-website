import "./WorkflowDiagram.css";

// A horizontal process-rail illustration for automation/workflow
// sections — an alternative to plain icon+card grids.
export default function WorkflowDiagram({ title, steps = [], className = "" }) {
  return (
    <div className={`illus-workflow ${className}`.trim()} role="img" aria-label={title || "Workflow diagram"}>
      {title && <p className="illus-workflow__title">{title}</p>}
      <div className="illus-workflow__track">
        {steps.map((s, i) => (
          <div className="illus-workflow__step" key={s.label}>
            <div className="illus-workflow__node">
              <span className="illus-workflow__node-num">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <p>{s.label}</p>
            {i < steps.length - 1 && (
              <span className="illus-workflow__arrow" aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
