import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useState } from 'react'
import BackgroundSelectionCard from './components/BackgroundSelectionCard'
import PostProcessingConfigCard from './components/PostProcessingConfigCard'
import SegmentationConfigCard from './components/SegmentationConfigCard'
import SourceSelectionCard from './components/SourceSelectionCard'
import ViewerCard from './components/ViewerCard'
import { Background, backgroundImageUrls } from './helpers/backgroundHelper'
import { PostProcessingConfig } from './helpers/postProcessingHelper'
import { SegmentationConfig } from './helpers/segmentationHelper'
import { Source, sourceImageUrls } from './helpers/sourceHelper'
import useBodyPix from './hooks/useBodyPix'
import useTFLite from './hooks/useTFLite'

function App() {
  const bodyPix = useBodyPix()
  useTFLite()

  const classes = useStyles()
  const [source, setSource] = useState<Source>({
    type: 'image',
    url: sourceImageUrls[0],
  })
  const [background, setBackground] = useState<Background>({
    type: 'image',
    url: backgroundImageUrls[0],
  })
  const [
    segmentationConfig,
    setSegmentationConfig,
  ] = useState<SegmentationConfig>({
    model: 'bodyPix',
    inputResolution: '360p',
  })
  const [
    postProcessingConfig,
    setPostProcessingConfig,
  ] = useState<PostProcessingConfig>({ smoothSegmentationMask: true })

  return (
    <div className={classes.root}>
      <ViewerCard
        source={source}
        background={background}
        bodyPix={bodyPix}
        segmentationConfig={segmentationConfig}
        postProcessingConfig={postProcessingConfig}
      />
      <SourceSelectionCard source={source} onChange={setSource} />
      <BackgroundSelectionCard
        background={background}
        onChange={setBackground}
      />
      <SegmentationConfigCard
        config={segmentationConfig}
        onChange={setSegmentationConfig}
      />
      <PostProcessingConfigCard
        config={postProcessingConfig}
        onChange={setPostProcessingConfig}
      />
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',

      [theme.breakpoints.up('xs')]: {
        margin: theme.spacing(1),
        gap: theme.spacing(1),
        gridTemplateColumns: '1fr',
      },

      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(2),
        gap: theme.spacing(2),
        gridTemplateColumns: 'repeat(2, 1fr)',
      },

      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    },
    resourceSelectionCards: {
      display: 'flex',
      flexDirection: 'column',
    },
  })
)

export default App
