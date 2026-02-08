import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import label

# ----------------------------
# FRONTIER DETECTION
# ----------------------------
def find_frontiers(grid):
    frontiers = np.zeros_like(grid)

    for x in range(1, grid.shape[0] - 1):
        for y in range(1, grid.shape[1] - 1):
            if grid[x, y] == 0:
                if -1 in grid[x-1:x+2, y-1:y+2]:
                    frontiers[x, y] = 1;
    return frontiers


# ----------------------------
# FRONTIER SELECTION
# ----------------------------
def select_frontier(grid, robot_pos):
    frontiers = find_frontiers(grid)
    labeled, num = label(frontiers)

    best_score = -1
    best_target = None

    for i in range(1, num + 1):
        cells = np.argwhere(labeled == i)

        # Ignore tiny noisy frontiers
        if len(cells) < 4:
            continue

        # Pick nearest cell instead of centroid
        dists = np.linalg.norm(cells - robot_pos, axis=1)
        idx = np.argmin(dists)
        target = tuple(cells[idx])

        info_gain = len(cells)
        dist = dists[idx]
        score = info_gain / (dist + 1e-3)

        if score > best_score:
            best_score = score
            best_target = target

    return best_target, frontiers


# ----------------------------
# SIMPLE ROBOT MOVE (SIMULATION)
# ----------------------------
def move_robot(robot_pos, target):
    if target is None:
        return robot_pos

    dx = np.sign(target[0] - robot_pos[0])
    dy = np.sign(target[1] - robot_pos[1])

    return (robot_pos[0] + dx, robot_pos[1] + dy)


# ----------------------------
# TEST ENVIRONMENT
# ----------------------------
grid = np.array([
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1,  0,  0,  0, -1, -1, -1, -1],
    [-1,  0,  1,  0,  0,  0, -1, -1],
    [-1,  0,  0,  0,  1,  0, -1, -1],
    [-1, -1, -1,  0,  0,  0, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
])

robot_pos = (2, 1)

# ----------------------------
# MAIN TEST LOOP
# ----------------------------
plt.figure(figsize=(6, 6))

for step in range(10):
    target, frontiers = select_frontier(grid, robot_pos)

    plt.clf()
    plt.title(f"Step {step}")

    plt.imshow(grid, cmap="gray")
    plt.imshow(frontiers, cmap="hot", alpha=0.5)

    plt.scatter(robot_pos[1], robot_pos[0], c="blue", s=100, label="Robot")

    if target:
        plt.scatter(target[1], target[0], c="green", s=100, label="Target")

    plt.legend()
    plt.pause(0.8)

    if target is None:
        print("Exploration complete.")
        break

    # Move robot
    robot_pos = move_robot(robot_pos, target)

    # Reveal new area (simulate sensing)
    x, y = robot_pos
    grid[x-1:x+2, y-1:y+2] = np.where(
        grid[x-1:x+2, y-1:y+2] == -1, 0, grid[x-1:x+2, y-1:y+2]
    )

plt.show()
