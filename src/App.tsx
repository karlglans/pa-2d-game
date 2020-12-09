import { css, Global } from '@emotion/core';
import React from 'react';
import AssetLoader from './@core/AssetLoader';
import Game from './@core/Game';
import Scene from './@core/Scene';
import SceneManager from './@core/SceneManager';
import useWindowSize from './@core/useWindowSize';
import HallwayScene from './scenes/HallwayScene';
import LivingroomSceen from './scenes/LivingroomSceen';
import StudyScene from './scenes/StudyScene';
import KitchenScene from './scenes/KitchenScene';
import soundData from './soundData';
import spriteData from './spriteData';
import globalStyles from './styles/global';

const styles = {
    root: (width: number, height: number) => css`
        display: flex;
        width: ${width - (width % 2)}px;
        height: ${height - (height % 2)}px;
        justify-content: center;
        align-items: center;
    `,
};

const urls = [
    ...Object.values(spriteData).map(data => data.src),
    ...Object.values(soundData).map(data => data.src),
    // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

export default function App() {
    const [width, height] = useWindowSize();

    return (
        <>
            <Global styles={globalStyles} />
            <div css={styles.root(width, height)}>
                <Game cameraZoom={80}>
                    <AssetLoader urls={urls} placeholder="Loading assets ...">
                        <SceneManager defaultScene="hallway">
                            <Scene id="hallway">
                                <HallwayScene />
                            </Scene>
                            <Scene id="livingroom">
                                <LivingroomSceen />
                            </Scene>
                            <Scene id="study">
                                <StudyScene />
                            </Scene>
                            <Scene id="kitchen">
                                <KitchenScene />
                            </Scene>
                        </SceneManager>
                    </AssetLoader>
                </Game>
            </div>
        </>
    );
}
