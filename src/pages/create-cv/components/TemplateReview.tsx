import type { ReactNode } from 'react';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

const PREVIEW_PAGE_WIDTH = 1152;
const PREVIEW_PAGE_HEIGHT = Math.round((PREVIEW_PAGE_WIDTH * 4) / 3);

function useScaleToFit(baseWidth: number, baseHeight: number) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [contentHeight, setContentHeight] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateContainerSize = () => {
      const rect = container.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    updateContainerSize();
    const ro = new ResizeObserver(updateContainerSize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const updateContentHeight = () => {
      setContentHeight(node.scrollHeight);
      setContentWidth(node.scrollWidth);
    };

    updateContentHeight();
    const ro = new ResizeObserver(updateContentHeight);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const scale = useMemo(() => {
    const { width, height } = containerSize;
    if (!width || !height) return 1;

    const scaleX = width / baseWidth;
    const scaleY = height / baseHeight;
    const nextScale = Math.min(scaleX, scaleY);
    return Number.isFinite(nextScale) ? nextScale : 1;
  }, [baseWidth, baseHeight, containerSize]);

  const scaledWidth = baseWidth * scale;
  const scaledHeight = baseHeight * scale;
  const offsetX = Math.max(0, (containerSize.width - scaledWidth) / 2);
  const offsetY = Math.max(0, (containerSize.height - scaledHeight) / 2);

  return { containerRef, contentRef, contentHeight, contentWidth, scale, offsetX, offsetY };
}

export function ScaledTemplatePreview({ children }: { children: ReactNode }) {
  const {
    containerRef,
    contentRef,
    contentHeight,
    contentWidth,
    scale: pageScale,
    offsetX: pageOffsetX,
    offsetY: pageOffsetY,
  } = useScaleToFit(PREVIEW_PAGE_WIDTH, PREVIEW_PAGE_HEIGHT);

  const contentScale = useMemo(() => {
    if (!contentHeight || !contentWidth) return 1;
    const scaleX = PREVIEW_PAGE_WIDTH / contentWidth;
    const scaleY = PREVIEW_PAGE_HEIGHT / contentHeight;
    const nextScale = Math.min(scaleX, scaleY);
    return Number.isFinite(nextScale) ? nextScale : 1;
  }, [contentHeight, contentWidth]);

  const contentScaledWidth = contentWidth * contentScale;
  const contentScaledHeight = contentHeight * contentScale;
  const contentOffsetX = Math.max(0, (PREVIEW_PAGE_WIDTH - contentScaledWidth) / 2);
  const contentOffsetY = Math.max(0, (PREVIEW_PAGE_HEIGHT - contentScaledHeight) / 2);

  return (
    <div className='border-border bg-card rounded-2xl border p-3 shadow-sm'>
      <div ref={containerRef} className='bg-background relative aspect-3/4 w-full overflow-hidden rounded-xl'>
        <div
          className='absolute'
          style={{
            width: PREVIEW_PAGE_WIDTH,
            height: PREVIEW_PAGE_HEIGHT,
            left: pageOffsetX,
            top: pageOffsetY,
            transform: `scale(${pageScale})`,
            transformOrigin: 'top left',
          }}>
          <div
            ref={contentRef}
            className='absolute'
            style={{
              left: contentOffsetX,
              top: contentOffsetY,
              transform: `scale(${contentScale})`,
              transformOrigin: 'top left',
            }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
