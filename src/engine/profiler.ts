
// somehow make a profiler that can get elapsed time or fps

export type Profiler = {

  delta: number,
  accTime: number,
  frames: number,

};

export const createProfiler = (displayFPS: boolean): Profiler => {

  const profiler: Profiler = {
    delta: 0,
    accTime: 0,
    frames: 0,
  };

  if(displayFPS)
    setInterval(() => {

      // frames per time elapsed
      // console.log(profiler.frames / profiler.accTime);
      
      console.log(profiler.frames); // actual number of frames per second

      profiler.frames = 0;
      profiler.accTime = 0;
    }, 1000);

  return profiler;
}

export const updateProfiler = (profiler: Profiler, delta: number): Profiler => {
    profiler.accTime = profiler.accTime + delta;
    profiler.frames = profiler.frames + 1;
    profiler.delta = delta;

    return profiler;
};

export const start = (profiler: Profiler): Profiler => {
  profiler.delta = Date.now();
  return profiler;
};

export const end = (profiler: Profiler): Profiler => {
  profiler.delta = Date.now() - profiler.delta;
  return profiler;
}

