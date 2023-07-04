export function getIconFromSprite(sprite, name, width, height) {
	return (
		<svg width={width} height={height}>
			<use href={sprite + "#" + name} />
		</svg>
	)
}
