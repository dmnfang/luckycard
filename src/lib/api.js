import { supabase } from '../supabase'

export async function fetchDecks(gradeId) {
  const { data, error } = await supabase
    .from('lc_decks')
    .select('*')
    .eq('grade_id', gradeId)
    .order('position')
  if (error) throw error
  return data
}

export async function fetchModes(deckId) {
  const { data, error } = await supabase
    .from('lc_modes')
    .select('*')
    .eq('deck_id', deckId)
    .order('position')
  if (error) throw error
  return data
}

export async function fetchVocab(modeId) {
  const { data, error } = await supabase
    .from('lc_vocab')
    .select('*')
    .eq('mode_id', modeId)
    .order('position')
  if (error) throw error
  return data
}

export async function fetchCards(modeId) {
  const { data, error } = await supabase
    .from('lc_cards')
    .select('*, vocab_a:vocab_a_id(*), vocab_b:vocab_b_id(*)')
    .eq('mode_id', modeId)
    .order('position')
  if (error) throw error
  return data
}

export async function fetchLines(modeId) {
  const { data, error } = await supabase
    .from('lc_lines')
    .select('*')
    .eq('mode_id', modeId)
    .order('position')
  if (error) throw error
  return data
}