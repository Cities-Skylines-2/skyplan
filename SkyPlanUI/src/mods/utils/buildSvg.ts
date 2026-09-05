type Pt = { x: number; y: number };

function add(a: Pt, b: Pt): Pt { return { x: a.x + b.x, y: a.y + b.y }; }
function scale(a: Pt, s: number): Pt { return { x: a.x * s, y: a.y * s }; }
function midpoint(a: Pt, b: Pt): Pt { return scale(add(a, b), 0.5); }

// Mirrors Skyplan.Cross/CurveMath.cs's Sample - must stay in lockstep or the live preview (this
// file) and the committed shape (server, same math) will visibly disagree.
//
// Quadratic B-spline over control points: the first and last points are true on-curve endpoints,
// every interior point is an off-curve attractor the curve bends toward but never touches. Fewer
// than 3 points is just a straight line - there's no interior point to act as a control.
export function buildCurve(pts: Pt[]): string {
	if (pts.length < 2) return '';
	if (pts.length < 3) return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`;
	const n = pts.length - 1;
	let d = `M ${pts[0].x} ${pts[0].y}`;
	// Each "Q control end" command leaves the path cursor at "end", which is exactly the next
	// iteration's start (both equal midpoint(pts[i], pts[i+1])) - no separate "move to start" needed.
	for (let i = 1; i <= n - 1; i++) {
		const segEnd = i === n - 1 ? pts[n] : midpoint(pts[i], pts[i + 1]);
		d += ` Q ${pts[i].x} ${pts[i].y} ${segEnd.x} ${segEnd.y}`;
	}
	return d;
}

export function buildPath(pts: Pt[]): string {
	if (pts.length < 2) return '';
	return `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
}

export function buildPolygon(pts: Pt[]): string {
	if (pts.length < 3) return '';
	return pts.map(p => `${p.x},${p.y}`).join(' ');
}

export function centroid(pts: Pt[]): Pt {
	const sum = pts.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), { x: 0, y: 0 });
	return { x: sum.x / pts.length, y: sum.y / pts.length };
}
