'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface VoteOption {
  personA: string
  personB: string
  theme: string
}

interface VoteCount {
  [key: string]: number
}

const personAOptions = ['松本人志', '島田紳助', '渡部建', '中田敦彦', '横山やすし', '村本大輔', 'なだぎ武']
const personBOptions = ['松本人志', '島田紳助', '渡部建', '中田敦彦', '横山やすし', '村本大輔', 'なだぎ武']
const themeOptions = ['浮気', '闇営業', '炎上', '交流関係']

export default function VotingSystem() {
  const [selectedVote, setSelectedVote] = useState<VoteOption>({
    personA: '',
    personB: '',
    theme: ''
  })
  const [voteCount, setVoteCount] = useState<VoteCount>({})
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleVote = () => {
    // バリデーション: personA と personB が同じ人物かどうか確認
    if (selectedVote.personA === selectedVote.personB) {
      setErrorMessage('Person A と Person B には同じ人を選べません。')
      return
    }

    // エラーメッセージをクリア
    setErrorMessage('')

    // 投票処理
    if (selectedVote.personA && selectedVote.personB && selectedVote.theme) {
      const voteKey = `${selectedVote.personA}-${selectedVote.personB}-${selectedVote.theme}`
      setVoteCount(prevCount => ({
        ...prevCount,
        [voteKey]: (prevCount[voteKey] || 0) + 1
      }))
      setSelectedVote({ personA: '', personB: '', theme: '' })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">投票システム</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>投票する</CardTitle>
          <CardDescription>Person A、Person B、Themeを選択してください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedVote.personA}
            onValueChange={(value) => setSelectedVote(prev => ({ ...prev, personA: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Person A を選択" />
            </SelectTrigger>
            <SelectContent>
              {personAOptions.map(person => (
                <SelectItem key={person} value={person}>{person}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedVote.personB}
            onValueChange={(value) => setSelectedVote(prev => ({ ...prev, personB: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Person B を選択" />
            </SelectTrigger>
            <SelectContent>
              {personBOptions.map(person => (
                <SelectItem key={person} value={person}>{person}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedVote.theme}
            onValueChange={(value) => setSelectedVote(prev => ({ ...prev, theme: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Theme を選択" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map(theme => (
                <SelectItem key={theme} value={theme}>{theme}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* エラーメッセージを表示 */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <Button 
            onClick={handleVote}
            disabled={!selectedVote.personA || !selectedVote.personB || !selectedVote.theme}
          >
            投票する
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>投票結果</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {Object.entries(voteCount).map(([key, count]) => {
              const [personA, personB, theme] = key.split('-')
              return (
                <li key={key} className="flex justify-between items-center">
                  <span>{`${personA} と ${personB} の ${theme}`}</span>
                  <span className="font-bold">{count} 票</span>
                </li>
              )
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
