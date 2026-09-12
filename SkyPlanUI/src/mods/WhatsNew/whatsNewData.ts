export interface WhatsNewMedia {
	type: 'image' | 'gif';
	src: string;
	alt: string;
	// Natural pixel dimensions of the source file - required so the panel can compute an explicit
	// display width/height in pixels. GameFace does not reliably resolve `height: auto` or a
	// percentage-padding aspect-ratio box on <img> (both confirmed broken 2026-09-12 - one
	// disappears the image entirely, the other breaks its layout position), so no auto/percentage
	// sizing is used at all - see WhatsNewPanel.tsx.
	width: number;
	height: number;
}

export interface WhatsNewEntry {
	version: string;
	date: string;
	bullets: string[];
	media?: WhatsNewMedia[];
}

// Newest first. Kept as a small manual duplicate of the changelog in
// Skyplan/Properties/PublishConfiguration.xml and README.md - not worth wiring cross-project
// auto-sync for a handful of lines per release.
export const WHATS_NEW: WhatsNewEntry[] = [
	{
		version: '0.1.2-beta',
		date: '2026-09-06',
		bullets: [
			'Added: Curve Tool.',
			'Added: Custom Icons for the Point Tool.',
			'Added: snapping - lines and polygons snap to other shapes, with an indicator on the overview.',
			'UX: you can now deselect tools and layers with right-click.',
			'Improved performance.',
			'Bug fix: shapes no longer become distorted when zooming.',
		],
	},
];
