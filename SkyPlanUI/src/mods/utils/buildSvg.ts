type Pt = { x: number; y: number };

// Mirrors Skyplan.Cross/CurveMath.cs's Sample - must stay in lockstep or the live preview (this
// file) and the committed shape (server, same math) will visibly disagree.
//
// Chained quadratic beziers, one control per segment: anchors are true on-curve points, each
// interior click is a permanently-locked control (once the segment it belongs to commits). A
// segment with no matching control (mid-draw preview, or fewer than 2 anchors) falls back to a
// straight line.
export function buildCurve(pts: Pt[], handles: Pt[]): string {
	if (pts.length < 2) return '';
	let d = `M ${pts[0].x} ${pts[0].y}`;
	for (let i = 0; i < pts.length - 1; i++) {
		const c = handles?.[i];
		d += c
			? ` Q ${c.x} ${c.y} ${pts[i + 1].x} ${pts[i + 1].y}`
			: ` L ${pts[i + 1].x} ${pts[i + 1].y}`;
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
