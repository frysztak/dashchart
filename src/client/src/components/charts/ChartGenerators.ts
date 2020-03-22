import { ChartAxis, ChartAxisDataType, ChartAxisScale } from './ChartProps';
import { scaleLinear, scaleLog, scaleOrdinal, ScaleOrdinal, ScaleLinear } from 'd3';
import { minmax } from '../../../../shared/utils/utils';

export function genScaler(axis: ChartAxis, range: [number, number]): ScaleLinear<number, number> | null {
  if (axis.scale === ChartAxisScale.LOG) {
    if (axis.dataType === ChartAxisDataType.STRING || axis.dataType === ChartAxisDataType.DATE) {
      throw new Error(`Scale '${axis.scale}' is unsupported with data type '${axis.dataType}'.`);
    }
  }

  switch (axis.dataType) {
    case ChartAxisDataType.NUMBER: {
      const domain: number[] = axis.domain || minmax(axis.data);
      const scale = axis.scale === ChartAxisScale.LINEAR ? scaleLinear() : scaleLog();
      return scale.domain(domain).range(range);
    }
    case ChartAxisDataType.DATE: {
      const domain: Date[] = axis.domain || minmax(axis.data);
      return scaleLinear()
        .domain(domain)
        .range(range);
    }
    /*
    case ChartAxisDataType.STRING: {
      const domain: string[] = axis.domain || axis.data;
      return scaleOrdinal()
        .domain(domain)
        .range(range);
    }
     */
  }

  return null;
}
