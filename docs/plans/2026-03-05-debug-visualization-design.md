# Debug Visualization Panel Design

**Goal:** Add a toggleable debug system that profiles shader performance with frame timing graphs, GPU instruction heatmaps, and error tracking.

## Architecture

### UI Structure

- **Debug toggle button** — Independent of Render/Code tabs, located in action bar
- **Overlay behavior** — When Debug ON + Render tab active → shows debug content as overlay on canvas
- **Dormant on Code tab** — When Debug ON + Code tab active → debug panel does not render
- **Dedicated Debug tab** — Clicking Debug tab switches to full-width panel with FRAMES/HEATMAP/ERRORS sub-tabs
- **Sub-tab navigation** — Three dedicated tabs: FRAMES, HEATMAP, ERRORS

### State Management

**New composable: `useShaderDebug.ts`**
- `isDebugOpen: Ref<boolean>` — Whether debug panel is active
- `activeDebugTab: Ref<'frames' | 'heatmap' | 'errors'>` — Currently selected sub-tab
- `frameMetrics: Ref<FrameMetric[]>` — Rolling buffer of last 60 frame timings
- `gpuTimerQuerySupported: Ref<boolean>` — Feature detection for EXT_disjoint_timer_query_webgl2
- `shaderErrors: Ref<ShaderError[]>` — Collected compilation errors
- `webglWarnings: Ref<WebGLWarning[]>` — Runtime warnings/errors

### Renderer Integration

**Extend `useShaderRenderer.ts`:**
- Capture frame timings before and after render pass
- Query GPU elapsed time via `EXT_disjoint_timer_query_webgl2` (if available)
- Store frame metric in rolling buffer (discard oldest when buffer > 60)
- Detect unsupported timer queries and set `gpuTimerQuerySupported` flag
- Pass error/warning messages to debug state

**Frame Metric structure:**
```typescript
interface FrameMetric {
  timestamp: number;     // when frame was captured
  cpuTimeMs: number;     // CPU time for frame
  gpuTimeMs: number;     // GPU time (from timer query, or null if unsupported)
  totalTimeMs: number;   // wall-clock frame time
}
```

## Three Sub-Tabs

### FRAMES Tab

**Display:**
- Real-time line graph showing frame time over last 60 frames
  - Green line = normal frame times (target 16.67ms @ 60 FPS)
  - Red line/spike = frame stutter (exceeds target)
  - Y-axis: milliseconds (0–50ms range, auto-scale to peak)
  - X-axis: frame number (0–59)

**Stats panel (above graph):**
- Current FPS (calculated from last frame)
- Average frame time (ms) over rolling window
- GPU time (ms) — from timer query
- Peak frame time (ms)
- Elapsed time indicator (e.g., "0:01")

**Design:**
- Canvas-based rendering for performance (don't DOM-spam graph points)
- Update graph every frame with new data point
- Color gradient in background (cool → hot) to highlight performance zones

### HEATMAP Tab

**Display:**
- GPU instruction count per pixel using thermal color gradient
  - Dark blue = low instruction count (cold/cheap)
  - Green/Yellow = moderate (warm)
  - Red/White = high instruction count (hot/expensive)

**Controls:**
- Toggle: "Show Heatmap" — Enable/disable heatmap rendering
- Stats: Min/Max/Avg instruction counts across all pixels

**"Not Supported" fallback:**
- If `EXT_disjoint_timer_query_webgl2` not available, show:
  - "GPU Timer Queries not supported on this device"
  - "Heatmap profiling requires WebGL timer queries"
  - Recommend Chrome, Firefox, Safari on desktop

**Implementation note:**
- Requires per-pass GPU timer queries during rendering
- May need shader modification or separate render pass to measure per-pixel cost
- Instruction count estimation via cumulative GPU time per tile/pixel region

### ERRORS Tab

**Display:**
- Scrollable list of shader compilation errors, WebGL warnings, runtime issues
- Each entry shows:
  - Error type (GLSL compile error, WebGL warning, texture load failure, etc.)
  - Message text
  - File/line number (if applicable)
  - Timestamp

**Design:**
- Monospace font (Fira Code)
- Color-coded by severity: error (red), warning (yellow), info (cyan)
- Max 100 entries (oldest discarded when full)

## Mobile Awareness

**Overlay on canvas:**
- Responsive sizing: 320px width on mobile, 400px on tablet/desktop
- Positioned bottom-right or top-right (avoid blocking center shader content)
- Single-column layout on mobile
- Expandable/collapsible sections on small screens

**Dedicated Debug tab:**
- Full-width layout on desktop
- Touch-friendly button sizes (44px minimum)
- Scrollable panels for FRAMES/HEATMAP/ERRORS

**Timer queries:**
- Gracefully disabled on unsupported devices
- "Not Supported" message shown in HEATMAP and FRAMES tabs if unavailable

## Styling & Theme

- Neutron UI dark theme (matches existing design)
- Monospace font: Fira Code
- Colors:
  - Frame graph green: `#00C8FF` (cyan, normal)
  - Frame graph red: `#FF3333` (red, stutter)
  - Heatmap gradient: dark blue → green → yellow → red → white
  - Error: `#FF3333`, Warning: `#FFD700`, Info: `#00C8FF`
- Semi-transparent backgrounds on overlay: `rgba(10, 15, 26, 0.9)`

## Data Flow

```
useShaderRenderer.ts (render loop)
  → captureFrameMetrics()
  → queryGPUTimer()
  → collectShaderErrors()
  → updateDebugState()
      ↓
useShaderDebug.ts (state holder)
  → frameMetrics, gpuTimerQuerySupported, shaderErrors
      ↓
DebugPanel.vue (renderer)
  → Shows FRAMES/HEATMAP/ERRORS based on activeDebugTab
      ↓
DebugOverlay.vue (canvas overlay, render view only)
  → Shows compact version of current sub-tab
```

## Constraints & Assumptions

- GPU timer queries may not be available on all browsers (graceful fallback)
- Heatmap rendering may impact performance (toggle to disable)
- Frame buffer limited to 60 frames to prevent memory bloat
- Shader errors captured at compile time, not runtime
- WebGL warnings depend on browser's error reporting level

## Success Criteria

- [x] Debug panel toggles independently of Render/Code tabs
- [x] Overlay appears on canvas when Render tab + Debug ON
- [x] Debug tab shows FRAMES, HEATMAP, ERRORS sub-tabs with dedicated content
- [x] FRAMES tab displays 60-frame graph with stats
- [x] HEATMAP tab shows GPU instruction cost (with "Not Supported" fallback)
- [x] ERRORS tab collects shader compilation errors and WebGL warnings
- [x] Mobile-responsive overlay positioning and sizing
- [x] Neutron UI theme consistency
