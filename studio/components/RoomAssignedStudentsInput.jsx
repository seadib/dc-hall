import React, { useEffect, useState, useCallback } from 'react'
import { Card, Stack, Text, Flex, Box, Badge, Button, Avatar, Spinner } from '@sanity/ui'
import { useClient, useFormValue, set } from 'sanity'
import { UsersIcon, SyncIcon, CheckmarkIcon, UserIcon } from '@sanity/icons'

export function RoomAssignedStudentsInput(props) {
  const { value, onChange, renderDefault } = props
  const client = useClient({ apiVersion: '2023-01-01' })

  // Read current document ID and room_no
  const docId = useFormValue(['_id'])
  const roomNo = useFormValue(['room_no'])
  const publishedId = docId ? String(docId).replace(/^drafts\./, '') : null

  const [profileStudents, setProfileStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [justSynced, setJustSynced] = useState(false)

  // Fetch students whose room_ref matches this room, or who reference this room, or whose room_no matches
  const fetchConnectedStudents = useCallback(async () => {
    if (!publishedId && !roomNo) return
    setLoading(true)
    try {
      const query = `*[_type == "student" && !(_id in path("drafts.**")) && (
        room_ref._ref == $pubId || 
        room_ref._ref == $docId || 
        references($pubId) || 
        (defined(room_no) && room_no == $roomNo)
      )]{
        _id,
        name_en,
        name_bn,
        short_roll,
        student_id,
        batch,
        "photo": photo.asset->url
      }`
      const res = await client.fetch(query, {
        pubId: publishedId || '',
        docId: docId || '',
        roomNo: String(roomNo || '').trim(),
      })
      setProfileStudents(res || [])
    } catch (e) {
      console.error('Error fetching room students from profiles:', e)
    } finally {
      setLoading(false)
    }
  }, [client, publishedId, docId, roomNo])

  useEffect(() => {
    fetchConnectedStudents()
  }, [fetchConnectedStudents])

  // Current references in the room's assigned_students array
  const currentArray = Array.isArray(value) ? value : []
  const currentRefIds = currentArray.map((item) => item?._ref).filter(Boolean)

  // Students from profile who are not yet in the array
  const unassignedFromProfile = profileStudents.filter((s) => !currentRefIds.includes(s._id))

  // Sync all connected students into room's assigned_students field
  const handleSyncAll = () => {
    if (!unassignedFromProfile.length) return
    const newItems = unassignedFromProfile.map((s) => ({
      _type: 'reference',
      _ref: s._id,
      _key: 'prof_' + s._id.replace(/[^a-zA-Z0-9]/g, '').slice(-8) + '_' + Math.random().toString(36).substring(2, 6),
    }))
    onChange(set([...currentArray, ...newItems]))
    setJustSynced(true)
    setTimeout(() => setJustSynced(false), 3000)
  }

  // Single student sync
  const handleSyncOne = (student) => {
    const newItem = {
      _type: 'reference',
      _ref: student._id,
      _key: 'prof_' + student._id.replace(/[^a-zA-Z0-9]/g, '').slice(-8) + '_' + Math.random().toString(36).substring(2, 6),
    }
    onChange(set([...currentArray, newItem]))
  }

  return (
    <Stack space={4}>
      {/* Live Connected Students Banner */}
      <Card
        padding={3}
        radius={3}
        border
        style={{
          background: 'rgba(15, 23, 42, 0.65)',
          borderColor: 'rgba(56, 189, 248, 0.35)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Stack space={3}>
          {/* Header Row */}
          <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
            <Flex align="center" gap={2}>
              <UsersIcon style={{ fontSize: 20, color: '#38bdf8' }} />
              <Text weight="bold" size={1} style={{ color: '#f1f5f9' }}>
                🎓 স্টুডেন্ট প্রোফাইল থেকে স্বয়ংক্রিয়ভাবে যুক্ত ({profileStudents.length} জন)
              </Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Button
                mode="ghost"
                fontSize={0}
                padding={2}
                icon={SyncIcon}
                text="রিফ্রেশ"
                onClick={fetchConnectedStudents}
              />
              {unassignedFromProfile.length > 0 && (
                <Button
                  tone="positive"
                  fontSize={1}
                  padding={2}
                  icon={CheckmarkIcon}
                  text={justSynced ? "✓ সিঙ্ক সম্পন্ন!" : `⚡ ${unassignedFromProfile.length} জনকে সিঙ্ক করুন`}
                  onClick={handleSyncAll}
                />
              )}
            </Flex>
          </Flex>

          {/* Student List or Empty State */}
          {loading ? (
            <Flex align="center" gap={2} padding={3}>
              <Spinner size={1} />
              <Text size={1} muted>
                স্টুডেন্ট প্রোফাইল খোঁজা হচ্ছে...
              </Text>
            </Flex>
          ) : profileStudents.length === 0 ? (
            <Box padding={2}>
              <Text size={1} muted style={{ lineHeight: 1.5 }}>
                এখনও কোনো শিক্ষার্থী তাদের প্রোফাইলে এই রুম সিলেক্ট করেনি। শিক্ষার্থী প্রোফাইলে Assigned Room হিসেবে এই রুম দিলে তা এখানে দেখাবে।
              </Text>
            </Box>
          ) : (
            <Stack space={2}>
              {profileStudents.map((st) => {
                const isAlreadyInList = currentRefIds.includes(st._id)
                return (
                  <Card
                    key={st._id}
                    padding={3}
                    radius={2}
                    border
                    style={{
                      background: isAlreadyInList ? 'rgba(34, 197, 94, 0.08)' : 'rgba(30, 41, 59, 0.7)',
                      borderColor: isAlreadyInList ? 'rgba(34, 197, 94, 0.35)' : 'rgba(255, 255, 255, 0.12)',
                    }}
                  >
                    <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
                      <Flex align="center" gap={3} style={{ flex: '1 1 auto', minWidth: 200 }}>
                        {st.photo ? (
                          <img
                            src={st.photo}
                            alt=""
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '2px solid rgba(56, 189, 248, 0.4)',
                            }}
                          />
                        ) : (
                          <Avatar size={2} icon={UserIcon} />
                        )}
                        <Box style={{ flex: 1 }}>
                          <Text
                            weight="bold"
                            size={1}
                            style={{
                              color: '#f8fafc',
                              lineHeight: 1.4,
                              display: 'block',
                              marginBottom: 4,
                            }}
                          >
                            {st.name_en}{' '}
                            {st.name_bn ? (
                              <span style={{ fontWeight: 500, opacity: 0.85, fontSize: '0.88em' }}>
                                ({st.name_bn})
                              </span>
                            ) : null}
                          </Text>
                          <Flex align="center" gap={2} wrap="wrap">
                            <Badge tone="primary" fontSize={0} padding={1}>
                              রোল: {st.short_roll || '—'}
                            </Badge>
                            {st.batch ? (
                              <Badge tone="default" fontSize={0} padding={1}>
                                ব্যাচ: {st.batch}
                              </Badge>
                            ) : null}
                          </Flex>
                        </Box>
                      </Flex>
                      <Flex align="center" gap={2}>
                        {isAlreadyInList ? (
                          <Badge tone="positive" fontSize={0} padding={2}>
                            ✓ এই রুমে রয়েছে
                          </Badge>
                        ) : (
                          <Button
                            tone="primary"
                            fontSize={0}
                            padding={2}
                            text="+ রুমে যুক্ত করুন"
                            onClick={() => handleSyncOne(st)}
                          />
                        )}
                      </Flex>
                    </Flex>
                  </Card>
                )
              })}
            </Stack>
          )}
        </Stack>
      </Card>

      {/* Render Default Sanity Array of References Input */}
      {renderDefault(props)}
    </Stack>
  )
}
