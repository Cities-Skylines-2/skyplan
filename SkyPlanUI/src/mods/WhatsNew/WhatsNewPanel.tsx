import React from 'react';
import {Scrollable, FormattedParagraphs, MarkdownRenderer, PanelFoldout} from 'cs2/ui';
import DraggablePanel from '../DraggablePanel/DraggablePanel';
import {WHATS_NEW, WhatsNewEntry} from './whatsNewData';
import styles from './WhatsNewPanel.module.scss';

interface WhatsNewPanelProps {
	onClose: () => void;
}

// Markdown subset confirmed working in-game (2026-09-12): headings, bold, links, lists, images -
// *italic* did not render. Avoid italics in entry content until/unless that's revisited.
const markdownRenderer = new MarkdownRenderer();

// Conservative fixed display width, comfortably inside the 600px panel's content area (body
// padding + Scrollable's own track). GameFace does not reliably resolve `height: auto` or a
// percentage-padding/position:absolute aspect-ratio box on <img> (both confirmed broken
// 2026-09-12 - either disappears the image or breaks its layout position), so height is computed
// as a plain pixel number from the image's known natural dimensions instead of relying on any
// auto/percentage sizing mechanism at all.
const MEDIA_MAX_WIDTH = 520;

const EntryView: React.FC<{ entry: WhatsNewEntry; accent?: boolean }> = ({entry, accent}) => (
	<div className={`${styles.entry} ${accent ? styles.entry_newest : ''}`}>
		<div className={styles.entry_header}>
			<span className={styles.version}>{entry.version}</span>
			<span className={styles.date}>{entry.date}</span>
		</div>
		<FormattedParagraphs className={styles.bullets} renderer={markdownRenderer}>
			{entry.bullets.map(b => `- ${b}`).join('\n')}
		</FormattedParagraphs>
		{entry.media?.map((m, i) => {
			const w = Math.min(m.width, MEDIA_MAX_WIDTH);
			const h = Math.round(w * (m.height / m.width));
			return <img key={i} src={m.src} alt={m.alt} className={styles.media} style={{ width: w, height: h }} />;
		})}
	</div>
);

const PANEL_WIDTH = 600;
const ASSUMED_PANEL_HEIGHT = 450;

const WhatsNewPanel: React.FC<WhatsNewPanelProps> = ({onClose}) => {
	const [newest, ...older] = WHATS_NEW;

	return (
		<DraggablePanel
			persistKey="whats-new"
			title="What's New"
			onClose={onClose}
			defaultPosition={{
				left: Math.max(20, (window.innerWidth - PANEL_WIDTH) / 2),
				top: Math.max(20, (window.innerHeight - ASSUMED_PANEL_HEIGHT) / 2),
			}}
			className={styles.panel}
		>
			<Scrollable className={styles.body}>
				{newest && <EntryView entry={newest} accent />}
				{older.length > 0 && (
					<PanelFoldout header={`Older versions (${older.length})`} initialExpanded={false}>
						{older.map(entry => <EntryView key={entry.version} entry={entry} />)}
					</PanelFoldout>
				)}
			</Scrollable>
		</DraggablePanel>
	);
};

export default WhatsNewPanel;
