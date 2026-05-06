import * as React from 'react';
import { Stack, Label, TextField, DefaultButton, IconButton, Text, Image } from '@fluentui/react';

interface IPhotoSectionProps {
  photoUrls: string[];
  onChange: (urls: string[]) => void;
  spContext?: any;
  siteUrl?: string;
}

const PhotoSection: React.FC<IPhotoSectionProps> = ({ photoUrls, onChange }) => {
  const [newUrl, setNewUrl] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const addUrl = () => {
    if (newUrl.trim()) {
      onChange([...photoUrls, newUrl.trim()]);
      setNewUrl('');
    }
  };

  const removeUrl = (idx: number) => {
    onChange(photoUrls.filter((_, i) => i !== idx));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          onChange([...photoUrls, ev.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  return (
    <Stack tokens={{ childrenGap: 12 }}>
      <Label style={{ fontSize: 16, fontWeight: 600 }}>Pictures</Label>

      <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="end">
        <Stack.Item grow={1}>
          <TextField
            label="Add photo URL"
            value={newUrl}
            onChange={(_, v) => setNewUrl(v || '')}
            placeholder="https://..."
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addUrl(); } }}
          />
        </Stack.Item>
        <DefaultButton text="Add URL" onClick={addUrl} disabled={!newUrl.trim()} />
      </Stack>

      <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
        <DefaultButton
          iconProps={{ iconName: 'Upload' }}
          text="Attach Photo(s)"
          onClick={() => fileInputRef.current?.click()}
        />
        <Text variant="small" style={{ color: '#605e5c' }}>
          Select images from your device (stored as data URLs in this session)
        </Text>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Stack>

      {photoUrls.length > 0 && (
        <Stack tokens={{ childrenGap: 10 }}>
          <Label>Attached Photos ({photoUrls.length})</Label>
          <Stack horizontal wrap tokens={{ childrenGap: 12 }}>
            {photoUrls.map((url, idx) => (
              <Stack key={idx} style={{ position: 'relative', border: '1px solid #edebe9', borderRadius: 4 }}>
                {url.startsWith('data:') || url.startsWith('http') ? (
                  <Image
                    src={url}
                    width={120}
                    height={90}
                    imageFit={3}
                    alt={`Photo ${idx + 1}`}
                    style={{ borderRadius: '4px 4px 0 0' }}
                  />
                ) : (
                  <Stack style={{ width: 120, height: 90, background: '#f3f2f1', alignItems: 'center', justifyContent: 'center' }}>
                    <Text variant="small" style={{ color: '#605e5c', padding: 4, wordBreak: 'break-all' }}>
                      {url.length > 30 ? url.substring(0, 30) + '...' : url}
                    </Text>
                  </Stack>
                )}
                <Stack
                  horizontal
                  horizontalAlign="space-between"
                  verticalAlign="center"
                  style={{ padding: '2px 4px' }}
                >
                  <Text variant="small">Photo {idx + 1}</Text>
                  <IconButton
                    iconProps={{ iconName: 'Delete' }}
                    title="Remove photo"
                    onClick={() => removeUrl(idx)}
                    styles={{ root: { height: 24, width: 24, color: '#a4262c' } }}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default PhotoSection;
