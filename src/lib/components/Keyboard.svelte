<script lang="ts">
	import Key from '$lib/components/Key.svelte'
</script>

<section class="keyboard container">
	<Key>
		<span>Esc</span>
	</Key>
	<Key>
		<span>Q</span>
		<span slot="layer1">F1</span>
		<span slot="layer2">F11</span>
	</Key>
	<Key>
		<span>W</span>
		<span slot="layer1">F2</span>
		<span slot="layer2">F12</span>
	</Key>
	<Key>
		<span>E</span>
		<span slot="layer1">F3</span>
		<span slot="layer2">Emoji</span>
	</Key>
	<Key>
		<span>R</span>
		<span slot="layer1">F4</span>
	</Key>
	<Key>
		<span>T</span>
		<span slot="layer1">F5</span>
	</Key>
	<Key>
		<span>Y</span>
		<span slot="layer1">F6</span>
		<span slot="layer2">PgUp</span>
	</Key>
	<Key>
		<span>U</span>
		<span slot="layer1">F7</span>
		<span slot="layer2">Home</span>
	</Key>
	<Key>
		<span>I</span>
		<span slot="layer1">F8</span>
		<span slot="layer2">⬆️</span>
	</Key>
	<Key>
		<span>O</span>
		<span slot="layer1">F9</span>
		<span slot="layer2">End</span>
	</Key>
	<Key>
		<span>P</span>
		<span slot="layer1">F10</span>
		<span slot="layer2">Del</span>
	</Key>
	<Key>
		<span>Bksp</span>
		<span slot="layer2">Del</span>
	</Key>
	<Key>
		<span>Tab</span>
	</Key>
	<Key>
		<span>A</span>
		<span slot="layer1">1!</span>
	</Key>
	<Key>
		<span>S</span>
		<span slot="layer1">2@</span>
	</Key>
	<Key>
		<span>D</span>
		<span slot="layer1">3#</span>
	</Key>
	<Key>
		<span>F</span>
		<span slot="layer1">4$</span>
		<span slot="layer2">Fullscreen</span>
	</Key>
	<Key>
		<span>G</span>
		<span slot="layer1">5%</span>
	</Key>
	<Key>
		<span>H</span>
		<span slot="layer1">6^</span>
		<span slot="layer2">PgDn</span>
	</Key>
	<Key>
		<span>J</span>
		<span slot="layer1">7&</span>
		<span slot="layer2">⬅️</span>
	</Key>
	<Key>
		<span>K</span>
		<span slot="layer1">8*</span>
		<span slot="layer2">⬇️</span>
	</Key>
	<Key>
		<span>L</span>
		<span slot="layer1">9(</span>
		<span slot="layer2">➡️</span>
	</Key>
	<Key>
		<span>;:</span>
		<span slot="layer1">0)</span>
	</Key>
	<Key>
		<span>'"</span>
		<span slot="layer1">-_</span>
	</Key>
	<Key>
		<span>Shift</span>
	</Key>
	<Key>
		<span>Z</span>
	</Key>
	<Key>
		<span>X</span>
		<span slot="layer1">&lt;-Space</span>
		<span slot="layer2">Prv</span>
	</Key>
	<Key>
		<span>C</span>
		<span slot="layer2">Play</span>
	</Key>
	<Key>
		<span>V</span>
		<span slot="layer1">&gt;-Space</span>
		<span slot="layer2">Next</span>
	</Key>
	<Key>
		<span>B</span>
		<span slot="layer2">Scr-</span>
	</Key>
	<Key>
		<span>N</span>
		<span slot="layer2">Scr+</span>
	</Key>
	<Key>
		<span>M</span>
		<span slot="layer1">&lt;-Tab</span>
		<span slot="layer2">Mute</span>

	</Key>
	<Key>
		<span>,&lt;</span>
		<span slot="layer1">&gt;-Tab</span>
		<span slot="layer2">Vol-</span>

	</Key>
	<Key>
		<span>.&gt;</span>
		<span slot="layer1">[&#123;</span>
		<span slot="layer2">Vol+</span>
	</Key>
	<Key>
		<span>/?</span>
		<span slot="layer1">]&#125;</span>
	</Key>
	<Key>
		<span>Enter</span>
		<span slot="layer1">=+</span>
	</Key>
	<Key>
		<span>Mo(2)</span>
	</Key>
	<Key>
		<span>Ctrl</span>
	</Key>
	<Key>
		<span>Mo(1)</span>
	</Key>
	<Key>
		<span>Opt</span>
	</Key>
	<Key>
		<span>Cmd</span>
	</Key>
	<Key width={2}>
		<span slot="layer2">Lang</span>
	</Key>
	<Key>
		<span>Mo(1)</span>
	</Key>
	<Key>
		<span>Undo</span>
		<span slot="layer2">Back</span>
	</Key>
	<Key>
		<span>Redo</span>
		<span slot="layer2">Fwd</span>
	</Key>
	<Key>
		<span>Mo(2)</span>
	</Key>
	<Key>
		<span>\|</span>
	</Key>
</section>

<style>
	.keyboard {
		display: grid;
		grid-template: repeat(4, minmax(0, 1fr)) / repeat(12, minmax(0, 1fr));
		font-size: 75%;
	}
</style>
