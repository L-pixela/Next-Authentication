'use client';
import { Container, Content, Panel, Table, Tag, Text, Stack, VStack } from 'rsuite';
import Image from 'next/image';

const { Column, HeaderCell, Cell } = Table;

const WarrantyDetail = [
  {
    title: "Air Conditioner 2HP LG DUALCOOL Dual Inverter with Air Purifying S...",
    sn: "SN-AC2HPLG",
    date: "01-Jan-2026",
    badge: "10 Years Left",
    badgeColor: "#ECFDF3",
    textColor: "#027A48",
    coverage: [
      {
        coverage_part_name: "Product Part 01",
        warranty_period: { period: "1 Year", remaining: "10 months left" },
        labor_coverage: { period: "1 Year", percentage: 100, remaining: "10 months left" },
      },
      {
        coverage_part_name: "Product Part 02",
        warranty_period: { period: "10 Years", remaining: "1 year left" },
        labor_coverage: { period: "1 Year", percentage: 100, remaining: "1 year left" },
      },
      {
        coverage_part_name: "Product Part 03",
        warranty_period: { period: "1 Month", remaining: "Expired" },
        labor_coverage: { period: "1 Month", percentage: 100, remaining: "Expired" },
      },
    ],
    term_n_condition: { url: "https://google.com" },
  },
];

function RemainingText({ remaining }: { remaining: string }) {
  return (
    <Text style={{ color: '#e5194b', fontSize: 12 }}>
      ({remaining})
    </Text>
  );
}

export default function WarrantyDetailPage() {
  const warranty = WarrantyDetail[0];

  return (
    <Container style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Content style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>

        {/* ── Title ── */}
        <Stack justifyContent="center" style={{ marginBottom: 32 }}>
          <Text as="h2" style={{ fontSize: 28, fontWeight: 700, color: '#111' }}>
            Warranty Information
          </Text>
        </Stack>

        {/* ── Product Card ── */}
        <Panel bordered style={{ borderRadius: 12, marginBottom: 24 }}>
          <Stack spacing={16} alignItems="center">

            {/* Product Image */}
            <Panel
              bordered
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                backgroundColor: '#f5f5f5',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                overflow: 'hidden',
              }}
            >
              <Image
                src="/product-placeholder.png"
                alt="product"
                width={80}
                height={80}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </Panel>

            {/* Product Info */}
            <Stack.Item grow={1}>
              <VStack spacing={4}>
                <Text style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>
                  {warranty.title}
                </Text>
                <Text style={{ fontSize: 13, color: '#555' }}>
                  SN: {warranty.sn}
                </Text>
                <Text style={{ fontSize: 13, color: '#555' }}>
                  Activation Date: {warranty.date}
                </Text>
                <Tag
                  style={{
                    backgroundColor: warranty.badgeColor,
                    color: warranty.textColor,
                    fontWeight: 600,
                    fontSize: 12,
                    borderRadius: 20,
                    padding: '2px 10px',
                    border: `1px solid ${warranty.textColor}33`,
                    width: 'fit-content',
                  }}
                >
                  {warranty.badge}
                </Tag>
              </VStack>
            </Stack.Item>

          </Stack>
        </Panel>

        {/* ── Coverage Condition ── */}
        <Panel
          bordered
          header={
            <Text style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>
              Coverage Condition
            </Text>
          }
          style={{ borderRadius: 12, marginBottom: 24 }}
        >
          <Table
            data={warranty.coverage}
            autoHeight
            bordered={false}
            cellBordered={false}
            rowHeight={70}
            headerHeight={44}
            color='#F9FAFB'
            style={{ width: '100%'}}
          >

            <Column flexGrow={1}>
              <HeaderCell>
                <Text style={{ fontSize: 13, color: '#555', fontWeight: 500 }}>Coverage Parts</Text>
              </HeaderCell>
              <Cell dataKey="coverage_part_name">
                {(rowData) => (
                  <Text style={{ fontSize: 14, color: '#111' }}>
                    {rowData.coverage_part_name}
                  </Text>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>
                <Text style={{ fontSize: 13, color: '#555', fontWeight: 500 }}>Warranty Period</Text>
              </HeaderCell>
              <Cell>
                {(rowData) => (
                  <VStack spacing={2}>
                    <Text style={{ fontSize: 14, color: '#111' }}>
                      {rowData.warranty_period.period}
                    </Text>
                    <RemainingText remaining={rowData.warranty_period.remaining} />
                  </VStack>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>
                <Text style={{ fontSize: 13, color: '#555', fontWeight: 500 }}>Labor Covered</Text>
              </HeaderCell>
              <Cell>
                {(rowData) => (
                  <VStack spacing={2}>
                    <Text style={{ fontSize: 14, color: '#111' }}>
                      {rowData.labor_coverage.period} {rowData.labor_coverage.percentage}% labor covered
                    </Text>
                    <RemainingText remaining={rowData.labor_coverage.remaining} />
                  </VStack>
                )}
              </Cell>
            </Column>

          </Table>
        </Panel>

        {/* ── Terms and Condition ── */}
        <Stack justifyContent="left">
          <Text style={{ fontSize: 13, color: '#555' }}>
            For more detail please view warranty{' '}
            <a
              href={warranty.term_n_condition.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#e5194b', fontWeight: 600, textDecoration: 'underline' }}
            >
              Term and Condition
            </a>
          </Text>
        </Stack>

      </Content>
    </Container>
  );
}