import { data } from '@/data/activity';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';


export default function Activity() {
    return (
        <div>
        <CalendarHeatmap
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-12-01')}
  values={data}
  showMonthLabels = {true}
 gutterSize={2}
 classForValue={(value) => {
    if (!value) {
      return 'color-empty';
    }
    return `color-scale-${value.count%4}`;
  }}
/>
</div>
    )
}
