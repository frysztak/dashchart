import { DataFrame } from 'shared/DataFrame';
import { Column, ColumnType } from '../../../shared/DataFrame';
import { BulletItem, BulletLocation } from '../misc/BulletItem';
import { Box, Flex } from 'reflexbox';
import { mapColumnType } from 'shared/DataFrame/DataFrame';
import { MagicWand } from '@styled-icons/boxicons-solid';
import { Group } from '../misc/PropsEditorGroups';
import React from 'react';
import { Icon } from '../misc/Icon';
import { styled } from '../../config/Theme';

export interface DataFrameTypeConversionsProps {
  dataFrame: DataFrame;
  convertType: (columnName: string, newType: ColumnType) => void;
}

const Wand = styled(Icon(MagicWand))`
  cursor: pointer;
`;

export function DataFrameTypeConversions(props: DataFrameTypeConversionsProps) {
  const { dataFrame, convertType } = props;

  const eligibleColumns: [string, Column][] = Object.entries(dataFrame.columns).filter(
    ([_, column]) => column.inferredType !== undefined && column.inferredType !== column.type,
  );

  if (!eligibleColumns.length) {
    return null;
  }

  const onConvertType = (name: string, type: ColumnType) => () => convertType(name, type);

  return (
    <Group groupName={'Type conversions'} collapsed={false}>
      <>
        {eligibleColumns.map(([name, column]) => {
          return (
            <BulletItem key={name} bulletLocation={BulletLocation.TOP}>
              <Flex flexDirection={'column'}>
                <Box mb={2}>
                  {name} :: {mapColumnType(column.type)}
                </Box>
                <Flex mb={3}>
                  Inferred type: {mapColumnType(column.inferredType!)}
                  <Box mx={1}>
                    <Wand size={24} onClick={onConvertType(name, column.inferredType!)} />
                  </Box>
                </Flex>
              </Flex>
            </BulletItem>
          );
        })}
      </>
    </Group>
  );
}
