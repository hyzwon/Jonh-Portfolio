import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseVideoSource,
  validatePortfolioItem,
  filterPortfolioItems,
  PortfolioItem,
} from './mediaUtils';

test('parseVideoSource correctly identifies YouTube standard URLs', () => {
  const result = parseVideoSource('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  assert.equal(result.type, 'youtube');
  assert.equal(result.isEmbeddable, true);
  assert.match(result.embedUrl, /https:\/\/www\.youtube\.com\/embed\/dQw4w9WgXcQ/);
});

test('parseVideoSource correctly identifies YouTube Shorts & youtu.be', () => {
  const shortResult = parseVideoSource('https://youtu.be/dQw4w9WgXcQ');
  assert.equal(shortResult.type, 'youtube');
  assert.match(shortResult.embedUrl, /dQw4w9WgXcQ/);

  const shortsResult = parseVideoSource('https://www.youtube.com/shorts/dQw4w9WgXcQ');
  assert.equal(shortsResult.type, 'youtube');
  assert.match(shortsResult.embedUrl, /dQw4w9WgXcQ/);
});

test('parseVideoSource identifies direct video files and blob URLs', () => {
  const directMp4 = parseVideoSource('https://example.com/videos/reel.mp4');
  assert.equal(directMp4.type, 'direct');
  assert.equal(directMp4.embedUrl, 'https://example.com/videos/reel.mp4');

  const blobUrl = parseVideoSource('blob:http://localhost:3000/1234-abcd');
  assert.equal(blobUrl.type, 'direct');
  assert.equal(blobUrl.embedUrl, 'blob:http://localhost:3000/1234-abcd');
});

test('parseVideoSource correctly converts Google Drive video links to embed preview', () => {
  const gdrive = parseVideoSource('https://drive.google.com/file/d/1A2B3C4D5E6F/view?usp=sharing');
  assert.equal(gdrive.type, 'vimeo');
  assert.equal(gdrive.isEmbeddable, true);
  assert.equal(gdrive.embedUrl, 'https://drive.google.com/file/d/1A2B3C4D5E6F/preview');
});

test('validatePortfolioItem enforces required fields', () => {
  const invalid = validatePortfolioItem({});
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.length >= 3);

  const valid = validatePortfolioItem({
    title: 'Brand Commercial',
    type: 'video',
    category: 'Commercial',
    mediaUrl: 'https://example.com/video.mp4',
  });
  assert.equal(valid.isValid, true);
  assert.equal(valid.errors.length, 0);
});

test('filterPortfolioItems filters by category and search term correctly', () => {
  const mockItems: PortfolioItem[] = [
    {
      id: '1',
      type: 'video',
      title: 'Cinematic Fashion Reel',
      category: 'Reels',
      year: '2025',
      tools: ['Premiere Pro', 'DaVinci Resolve'],
      description: 'Dynamic rhythm and high contrast grading.',
      mediaUrl: 'https://example.com/1.mp4',
    },
    {
      id: '2',
      type: 'graphic',
      title: 'Youth Summit Poster',
      category: 'Posters',
      client: 'ILAW Community',
      year: '2024',
      tools: ['Photoshop', 'Canva'],
      description: 'Advocacy print campaign layout.',
      mediaUrl: 'https://example.com/2.jpg',
    },
  ];

  const all = filterPortfolioItems(mockItems, 'all', '');
  assert.equal(all.length, 2);

  const filteredCat = filterPortfolioItems(mockItems, 'Reels', '');
  assert.equal(filteredCat.length, 1);
  assert.equal(filteredCat[0].id, '1');

  const searchTool = filterPortfolioItems(mockItems, 'all', 'photoshop');
  assert.equal(searchTool.length, 1);
  assert.equal(searchTool[0].id, '2');

  const searchClient = filterPortfolioItems(mockItems, 'all', 'ILAW');
  assert.equal(searchClient.length, 1);
  assert.equal(searchClient[0].id, '2');
});
