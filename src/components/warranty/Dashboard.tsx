"use client";

import { Container, Nav, Button, Heading, Tag, Text, VStack, HStack, Panel } from "rsuite";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const warrantyData = [
  { title: "Air Conditioner 2HP LG DUALCOOL Dual Inverter with Air Purifying S...", sn: "SN-AC2HPLG", date: "01-Jan-2026", badge: "5 Years Left", badgeColor: "#ECFDF3", textColor: "#027A48" },
  { title: null, sn: "SN-AC2HPLG", date: "01-Jan-2026", badge: "Expired", badgeColor: "#F2F4F7", textColor: "#344054" },
  { title: "Air Conditioner 2HP LG DUALCOOL Dual Inverter with Air Purifying S...", sn: "SN-AC2HPLG", date: "01-Jan-2026", badge: "10 Years Left", badgeColor: "#ECFDF3", textColor: "#027A48" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("registered");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  return (
    <Container style={{ maxWidth: 768, margin: "0 auto", marginTop: 64, marginBottom: 96, padding: 24 }}>
      <Heading level={3} style={{ textAlign: "center", marginBottom: 20 }}>
        Warranty Information
      </Heading>

      <Nav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        style={{ marginBottom: 20 }}
      >
        <Nav.Item eventKey="registered">Registered</Nav.Item>
        <Nav.Item eventKey="submitted">Submitted</Nav.Item>
      </Nav>

      {activeTab === "registered" && (
        <VStack spacing={12} style={{ width: '100%' }}>
          {warrantyData.map((item, i) => (
            <Panel
              key={i}
              bordered
              onClick={() => router.push(`/warranty/${item.sn}`)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                width: '100%',
                borderRadius: 12,
                backgroundColor: '#fff',
                overflow: "hidden",
                boxShadow: hoveredIndex === i
                  ? '0 4px 12px rgba(0,0,0,0.12)'
                  : '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              <HStack spacing={16} alignItems="center" style={{
                textOverflow: "ellipsis"
              }} overflow={"hidden"}>

                {/* Thumbnail */}
                <Image
                  src="/no_image.png"
                  height={80}
                  width={80}
                  alt="Product"
                  style={{ objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                />

                {/* Info */}
                <VStack spacing={4} style={{ flex: 1, minWidth: 0 }}>
                  {item.title && (
                    <Heading
                      level={6}
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                      }}
                    >
                      {item.title}
                    </Heading>
                  )}
                  <Text size="sm" style={{ color: '#6b7280' }}>SN: {item.sn}</Text>
                  <Text size="sm" style={{ color: '#6b7280' }}>Activation Date: {item.date}</Text>
                  <Tag
                    style={{
                      backgroundColor: item.badgeColor,
                      color: item.textColor,
                      borderRadius: 20,
                      padding: '2px 12px',
                      fontWeight: 600,
                      fontSize: 12,
                      width: 'fit-content',
                    }}
                  >
                    {item.badge}
                  </Tag>
                </VStack>

              </HStack>
            </Panel>
          ))}
        </VStack>
      )}

      {activeTab === "submitted" && (
        <Text style={{ textAlign: "center", color: "#aaa", padding: "40px 0", display: "block" }}>
          No submitted warranties
        </Text>
      )}

      <Button
        block
        appearance="primary"
        style={{ backgroundColor: "#e5173f", border: "none", marginTop: 20, height: 48 }}
      >
        Register New Product Warranty
      </Button>
    </Container>
  );
}