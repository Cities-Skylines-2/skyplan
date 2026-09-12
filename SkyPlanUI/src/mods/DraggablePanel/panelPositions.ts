// Remembers each DraggablePanel instance's dragged position across mount/unmount (e.g. the whole
// Skyplan overlay closing/reopening via Alt+P) without needing a dedicated field per panel in
// SkyplanContext. Plain in-memory module state - survives for the lifetime of the loaded UI
// bundle, not across game sessions (same scope SkyplanContext's own state already had).
const positions = new Map<string, { left: number; top: number }>();

export function getPanelPosition(key: string, fallback: { left: number; top: number }): { left: number; top: number } {
	return positions.get(key) ?? fallback;
}

export function setPanelPosition(key: string, pos: { left: number; top: number }): void {
	positions.set(key, pos);
}
