import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, RotateCcw, Copy, CheckCircle } from 'lucide-react';

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  description: string;
  code: string;
  output?: string;
  initialParams?: Record<string, any>;
}

const codeSnippets: CodeSnippet[] = [
  {
    id: "neural-interface",
    title: "Neural Signal Processing",
    language: "python",
    description: "Real-time EEG signal processing algorithm for brain-computer interface",
    code: `import numpy as np
from scipy import signal

def process_eeg_signals(raw_data, sampling_rate=250, 
                        notch_freq=50, bandpass_range=(8, 30)):
    """
    Process EEG signals with filtering and feature extraction
    
    Parameters:
    -----------
    raw_data: numpy.ndarray
        Raw EEG signal data
    sampling_rate: int
        Sampling frequency in Hz
    notch_freq: int
        Frequency to filter out (usually power line noise)
    bandpass_range: tuple
        Frequency range to keep (min, max)
    
    Returns:
    --------
    processed_data: numpy.ndarray
        Filtered data
    features: numpy.ndarray
        Extracted features for classification
    """
    # Apply a notch filter to remove power line noise
    b_notch, a_notch = signal.iirnotch(
        notch_freq, 30, sampling_rate
    )
    notched_data = signal.filtfilt(b_notch, a_notch, raw_data)
    
    # Apply bandpass filter to isolate frequency range of interest
    b_bandpass, a_bandpass = signal.butter(
        4, 
        [f / (sampling_rate/2) for f in bandpass_range], 
        'bandpass'
    )
    filtered_data = signal.filtfilt(b_bandpass, a_bandpass, notched_data)
    
    # Extract features (power in different frequency bands)
    features = extract_band_powers(filtered_data, sampling_rate)
    
    return filtered_data, features

# Demo with sample data
if __name__ == "__main__":
    # Create synthetic EEG data with 50Hz noise
    t = np.linspace(0, 4, 1000)
    raw_eeg = (np.sin(2*np.pi*10*t) + 
              0.5*np.sin(2*np.pi*50*t) +  # Power line noise
              0.2*np.random.randn(len(t)))  # Random noise
              
    # Process the data
    filtered_data, features = process_eeg_signals(raw_eeg)
    
    print(f"Raw data shape: {raw_eeg.shape}")
    print(f"Filtered data shape: {filtered_data.shape}")
    print(f"Extracted features: {features}")`,
    output: `Raw data shape: (1000,)
Filtered data shape: (1000,)
Extracted features: {'alpha': 0.32, 'beta': 0.45, 'theta': 0.12, 'gamma': 0.05}`,
    initialParams: {
      notchFreq: 50,
      bandpassMin: 8,
      bandpassMax: 30
    }
  },
  {
    id: "iot-security",
    title: "IoT Security Scanner",
    language: "python",
    description: "Vulnerability scanner for IoT devices with automated detection",
    code: `import socket
import sys
import time
import json
from typing import Dict, List, Tuple

class IoTSecurityScanner:
    def __init__(self, target_ip: str, port_range: Tuple[int, int] = (1, 1024),
                timeout: float = 1.0, vuln_db_path: str = "vuln_db.json"):
        """
        Initialize the IoT security scanner
        
        Parameters:
        -----------
        target_ip: str
            IP address of the target device
        port_range: tuple
            Range of ports to scan (min, max)
        timeout: float
            Timeout for connection attempts in seconds
        vuln_db_path: str
            Path to vulnerability database JSON file
        """
        self.target_ip = target_ip
        self.port_range = port_range
        self.timeout = timeout
        self.open_ports = []
        self.services = {}
        self.vulnerabilities = []
        self.vuln_db = self._load_vuln_db(vuln_db_path)
        
    def _load_vuln_db(self, path: str) -> Dict:
        """Load vulnerability database from JSON file"""
        try:
            with open(path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Warning: Vulnerability database not found at {path}")
            return {}
            
    def scan_ports(self) -> List[int]:
        """Scan for open ports on the target device"""
        print(f"Starting port scan on {self.target_ip}")
        start_time = time.time()
        
        for port in range(self.port_range[0], self.port_range[1] + 1):
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(self.timeout)
            result = s.connect_ex((self.target_ip, port))
            if result == 0:
                self.open_ports.append(port)
                service = self._identify_service(port)
                self.services[port] = service
                print(f"Port {port}: Open - {service}")
            s.close()
        
        scan_time = time.time() - start_time
        print(f"Scan completed in {scan_time:.2f} seconds")
        print(f"Found {len(self.open_ports)} open ports")
        return self.open_ports
    
    def _identify_service(self, port: int) -> str:
        """Identify service running on a port"""
        common_ports = {
            22: "SSH", 23: "Telnet", 80: "HTTP", 443: "HTTPS",
            25: "SMTP", 21: "FTP", 3306: "MySQL", 8080: "HTTP-ALT",
            1883: "MQTT", 5683: "CoAP", 8883: "MQTT-SSL"
        }
        return common_ports.get(port, "Unknown")
    
    def check_vulnerabilities(self) -> List[Dict]:
        """Check for known vulnerabilities in identified services"""
        for port, service in self.services.items():
            for vuln in self.vuln_db.get(service, []):
                # Simplified detection logic for demo purposes
                if self._check_vulnerability_exists(port, vuln):
                    self.vulnerabilities.append({
                        "port": port,
                        "service": service,
                        "cve_id": vuln["cve_id"],
                        "description": vuln["description"],
                        "severity": vuln["severity"]
                    })
                    print(f"Vulnerability found: {vuln['cve_id']} on port {port}")
        
        return self.vulnerabilities
    
    def _check_vulnerability_exists(self, port: int, vuln: Dict) -> bool:
        """Check if a vulnerability exists on the target port"""
        # This would contain actual vulnerability checks
        # Simplified for demo purposes
        return False  # Placeholder
    
    def generate_report(self) -> Dict:
        """Generate a security report for the target device"""
        high_severity = sum(1 for v in self.vulnerabilities if v["severity"] == "High")
        medium_severity = sum(1 for v in self.vulnerabilities if v["severity"] == "Medium")
        low_severity = sum(1 for v in self.vulnerabilities if v["severity"] == "Low")
        
        report = {
            "target_ip": self.target_ip,
            "scan_time": time.strftime("%Y-%m-%d %H:%M:%S"),
            "open_ports": self.open_ports,
            "services": self.services,
            "vulnerabilities": self.vulnerabilities,
            "summary": {
                "total_open_ports": len(self.open_ports),
                "total_vulnerabilities": len(self.vulnerabilities),
                "high_severity": high_severity,
                "medium_severity": medium_severity,
                "low_severity": low_severity,
                "risk_score": self._calculate_risk_score(high_severity, medium_severity, low_severity)
            }
        }
        return report
    
    def _calculate_risk_score(self, high: int, medium: int, low: int) -> float:
        """Calculate overall risk score based on vulnerabilities"""
        return min(10, (high * 3.0 + medium * 1.5 + low * 0.5))

# Demo usage
if __name__ == "__main__":
    # For demo purposes, we'll use a fake IP
    scanner = IoTSecurityScanner("192.168.1.100", port_range=(20, 100))
    scanner.scan_ports()
    scanner.check_vulnerabilities()
    report = scanner.generate_report()
    
    print("\\nSecurity Report Summary:")
    print(f"Target: {report['target_ip']}")
    print(f"Open ports: {len(report['open_ports'])}")
    print(f"Vulnerabilities: {report['summary']['total_vulnerabilities']}")
    print(f"Risk score: {report['summary']['risk_score']}/10")`,
    output: `Starting port scan on 192.168.1.100
Port 22: Open - SSH
Port 80: Open - HTTP
Port 23: Open - Telnet
Scan completed in 81.45 seconds
Found 3 open ports

Security Report Summary:
Target: 192.168.1.100
Open ports: 3
Vulnerabilities: 0
Risk score: 0.0/10`,
    initialParams: {
      targetIp: "192.168.1.100",
      portRangeStart: 20, 
      portRangeEnd: 100
    }
  },
  {
    id: "autonomous-drone",
    title: "Autonomous Drone Navigation",
    language: "python", 
    description: "ROS-based path planning for autonomous drone navigation",
    code: `#!/usr/bin/env python3
import rospy
import numpy as np
from nav_msgs.msg import OccupancyGrid, Path
from geometry_msgs.msg import PoseStamped, Point
import matplotlib.pyplot as plt
from matplotlib import colors

class RRTPathPlanner:
    def __init__(self, map_topic="/map", path_topic="/path",
                max_iterations=5000, step_size=0.5):
        """
        RRT* Path Planner for Autonomous Drone Navigation
        
        Parameters:
        -----------
        map_topic: str
            ROS topic name for the occupancy grid map
        path_topic: str
            ROS topic name to publish the planned path
        max_iterations: int
            Maximum number of iterations for RRT*
        step_size: float
            Step size for expanding the tree
        """
        rospy.init_node('rrt_path_planner', anonymous=True)
        
        # ROS Publishers/Subscribers
        self.map_sub = rospy.Subscriber(map_topic, OccupancyGrid, self.map_callback)
        self.path_pub = rospy.Publisher(path_topic, Path, queue_size=10)
        
        # Path planning parameters
        self.max_iterations = max_iterations
        self.step_size = step_size
        self.obstacle_threshold = 50  # cells with values above this are obstacles
        self.rewire_radius = 2.0  # radius for rewiring in RRT*
        
        # Map data
        self.map_data = None
        self.map_width = 0
        self.map_height = 0
        self.map_resolution = 0
        self.map_origin = None
        
        # RRT* tree
        self.nodes = []  # list of (x,y) coordinates
        self.parent_indices = []  # parent index for each node
        self.costs = []  # cost to reach each node
        
        rospy.loginfo("RRT* Path Planner initialized")
    
    def map_callback(self, map_msg):
        """Process the occupancy grid map data"""
        self.map_data = np.array(map_msg.data).reshape(
            (map_msg.info.height, map_msg.info.width))
        self.map_width = map_msg.info.width
        self.map_height = map_msg.info.height
        self.map_resolution = map_msg.info.resolution
        self.map_origin = (map_msg.info.origin.position.x, 
                          map_msg.info.origin.position.y)
        
        rospy.loginfo(f"Received map: {self.map_width}x{self.map_height}, "
                     f"resolution: {self.map_resolution}")
    
    def is_collision_free(self, x1, y1, x2, y2):
        """Check if a path between two points is collision-free"""
        if self.map_data is None:
            return False
            
        # Convert world coordinates to grid coordinates
        gx1 = int((x1 - self.map_origin[0]) / self.map_resolution)
        gy1 = int((y1 - self.map_origin[1]) / self.map_resolution)
        gx2 = int((x2 - self.map_origin[0]) / self.map_resolution)
        gy2 = int((y2 - self.map_origin[1]) / self.map_resolution)
        
        # Check bounds
        if (gx1 < 0 or gx1 >= self.map_width or 
            gy1 < 0 or gy1 >= self.map_height or
            gx2 < 0 or gx2 >= self.map_width or 
            gy2 < 0 or gy2 >= self.map_height):
            return False
        
        # Check if start or end is in collision
        if (self.map_data[gy1, gx1] > self.obstacle_threshold or 
            self.map_data[gy2, gx2] > self.obstacle_threshold):
            return False
            
        # Check points along the line
        n_points = max(int(np.hypot(gx2 - gx1, gy2 - gy1) * 2), 2)
        for i in range(n_points):
            t = i / (n_points - 1)
            gx = int((1 - t) * gx1 + t * gx2)
            gy = int((1 - t) * gy1 + t * gy2)
            
            if (gx < 0 or gx >= self.map_width or 
                gy < 0 or gy >= self.map_height):
                return False
                
            if self.map_data[gy, gx] > self.obstacle_threshold:
                return False
                
        return True
    
    def plan_path(self, start, goal):
        """
        Plan a path from start to goal using RRT*
        
        Parameters:
        -----------
        start: tuple
            Start position (x, y) in world coordinates
        goal: tuple
            Goal position (x, y) in world coordinates
            
        Returns:
        --------
        path: list
            List of (x, y) waypoints from start to goal
        """
        if self.map_data is None:
            rospy.logwarn("No map data available for planning")
            return []
            
        # Initialize RRT* tree
        self.nodes = [start]
        self.parent_indices = [0]  # root is its own parent
        self.costs = [0.0]  # cost to root is zero
        
        # Main RRT* loop
        goal_reached = False
        goal_idx = 0
        
        for i in range(self.max_iterations):
            # Sample random point (with goal bias)
            if np.random.random() < 0.05:  # 5% goal bias
                sample = goal
            else:
                sample = (
                    np.random.uniform(self.map_origin[0], 
                                     self.map_origin[0] + self.map_width * self.map_resolution),
                    np.random.uniform(self.map_origin[1], 
                                     self.map_origin[1] + self.map_height * self.map_resolution)
                )
            
            # Find nearest node
            distances = [np.hypot(sample[0] - n[0], sample[1] - n[1]) 
                        for n in self.nodes]
            nearest_idx = np.argmin(distances)
            nearest = self.nodes[nearest_idx]
            
            # Steer towards sample
            theta = np.arctan2(sample[1] - nearest[1], 
                              sample[0] - nearest[0])
            new_node = (
                nearest[0] + self.step_size * np.cos(theta),
                nearest[1] + self.step_size * np.sin(theta)
            )
            
            # Check collision
            if not self.is_collision_free(nearest[0], nearest[1], 
                                         new_node[0], new_node[1]):
                continue
                
            # Find nearest neighbors for rewiring
            new_cost = self.costs[nearest_idx] + self.step_size
            new_parent = nearest_idx
            
            # Add node to tree
            self.nodes.append(new_node)
            self.parent_indices.append(new_parent)
            self.costs.append(new_cost)
            new_idx = len(self.nodes) - 1
            
            # Rewire tree (RRT* optimization)
            self._rewire_tree(new_idx)
            
            # Check if we've reached the goal
            dist_to_goal = np.hypot(new_node[0] - goal[0], 
                                   new_node[1] - goal[1])
            if dist_to_goal < self.step_size:
                goal_reached = True
                goal_idx = new_idx
                break
                
            if i % 100 == 0:
                rospy.loginfo(f"Planning iteration {i}, tree size: {len(self.nodes)}")
                
        # Extract path
        if goal_reached:
            path = self._extract_path(goal_idx)
            rospy.loginfo(f"Path found with {len(path)} waypoints")
            self._publish_path(path)
            return path
        else:
            rospy.logwarn("Failed to reach goal within iteration limit")
            return []
    
    def _rewire_tree(self, new_idx):
        """Rewire the tree to optimize paths (RRT* algorithm)"""
        new_node = self.nodes[new_idx]
        
        # Find nodes within rewiring radius
        for i, node in enumerate(self.nodes[:-1]):  # exclude the new node
            dist = np.hypot(node[0] - new_node[0], node[1] - new_node[1])
            
            if dist < self.rewire_radius:
                # Check if path through new_node is better
                potential_cost = self.costs[new_idx] + dist
                
                if (potential_cost < self.costs[i] and 
                    self.is_collision_free(new_node[0], new_node[1], 
                                          node[0], node[1])):
                    self.parent_indices[i] = new_idx
                    self.costs[i] = potential_cost
    
    def _extract_path(self, goal_idx):
        """Extract the path from start to goal"""
        path = []
        current_idx = goal_idx
        
        while current_idx != 0:  # until we reach the root
            path.append(self.nodes[current_idx])
            current_idx = self.parent_indices[current_idx]
            
        path.append(self.nodes[0])  # add the start node
        return path[::-1]  # reverse to get path from start to goal
    
    def _publish_path(self, path):
        """Publish the planned path as a ROS Path message"""
        if not path:
            return
            
        ros_path = Path()
        ros_path.header.stamp = rospy.Time.now()
        ros_path.header.frame_id = "map"
        
        for point in path:
            pose = PoseStamped()
            pose.header = ros_path.header
            pose.pose.position.x = point[0]
            pose.pose.position.y = point[1]
            pose.pose.position.z = 1.5  # constant altitude for simplicity
            ros_path.poses.append(pose)
            
        self.path_pub.publish(ros_path)
        
    def visualize_path(self, path):
        """Visualize the map and planned path"""
        if self.map_data is None or not path:
            rospy.logwarn("Cannot visualize: Missing map data or path")
            return
            
        # Create a colormap for the map
        cmap = colors.ListedColormap(['white', 'gray', 'black'])
        bounds = [-1, 0, self.obstacle_threshold, 100]
        norm = colors.BoundaryNorm(bounds, cmap.N)
        
        plt.figure(figsize=(10, 8))
        plt.imshow(self.map_data, cmap=cmap, norm=norm, origin='lower')
        
        # Convert path to grid coordinates
        grid_path = []
        for p in path:
            gx = int((p[0] - self.map_origin[0]) / self.map_resolution)
            gy = int((p[1] - self.map_origin[1]) / self.map_resolution)
            grid_path.append((gx, gy))
            
        # Plot the path
        x_coords, y_coords = zip(*grid_path)
        plt.plot(x_coords, y_coords, 'b-', linewidth=2, label='Planned Path')
        
        plt.scatter(x_coords[0], y_coords[0], c='g', s=100, marker='o', label='Start')
        plt.scatter(x_coords[-1], y_coords[-1], c='r', s=100, marker='x', label='Goal')
        
        plt.title('RRT* Path Planning for Autonomous Drone Navigation')
        plt.legend()
        plt.grid(True)
        plt.savefig('/tmp/path_planning_visualization.png')
        rospy.loginfo("Path visualization saved to /tmp/path_planning_visualization.png")
        
# Demo usage (if not running as a ROS node)
if __name__ == "__main__":
    try:
        planner = RRTPathPlanner()
        rospy.loginfo("Waiting for map data...")
        rospy.sleep(2)  # wait for map data
        
        # Plan a path from start to goal
        start = (1.0, 1.0)
        goal = (9.0, 9.0)
        path = planner.plan_path(start, goal)
        
        if path:
            planner.visualize_path(path)
        
        rospy.spin()
    except rospy.ROSInterruptException:
        pass`,
    output: `[INFO] [1632751428.123456]: RRT* Path Planner initialized
[INFO] [1632751430.234567]: Received map: 500x500, resolution: 0.05
[INFO] [1632751430.345678]: Planning iteration 0, tree size: 1
[INFO] [1632751430.456789]: Planning iteration 100, tree size: 76
[INFO] [1632751430.567890]: Planning iteration 200, tree size: 143
[INFO] [1632751430.678901]: Planning iteration 300, tree size: 214
[INFO] [1632751430.789012]: Path found with 23 waypoints
[INFO] [1632751430.890123]: Path visualization saved to /tmp/path_planning_visualization.png`,
    initialParams: {
      maxIterations: 5000,
      stepSize: 0.5,
      rewireRadius: 2.0
    }
  }
];

const CodeDemo = () => {
  const [activeSnippet, setActiveSnippet] = useState<CodeSnippet>(codeSnippets[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [params, setParams] = useState<Record<string, any>>({});
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionOutput, setExecutionOutput] = useState<string>("");
  
  useEffect(() => {
    // Reset state when changing snippets
    if (activeSnippet.initialParams) {
      setParams(activeSnippet.initialParams);
    } else {
      setParams({});
    }
    setExecutionOutput("");
    setCopied(false);
  }, [activeSnippet]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    
    // Simulate code execution with a delay
    setTimeout(() => {
      setExecutionOutput(activeSnippet.output || "");
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    if (activeSnippet.initialParams) {
      setParams(activeSnippet.initialParams);
    }
    setExecutionOutput("");
  };
  
  const updateParam = (key: string, value: any) => {
    setParams({
      ...params,
      [key]: value
    });
  };

  return (
    <div className="py-20 relative overflow-hidden matrix-bg" id="code-demos">
      <div className="absolute inset-0 bg-cyber-dark/50" />
      <div className="matrix-code opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-cyber">
            <span className="neon-text">Interactive Code Demos</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
            Explore working code samples from my projects with interactive parameters
          </p>
        </motion.div>

        {/* Snippet Selection */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center">
          {codeSnippets.map((snippet) => (
            <motion.button
              key={snippet.id}
              onClick={() => setActiveSnippet(snippet)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 font-mono hologram-effect flex items-center gap-2 ${
                activeSnippet.id === snippet.id
                  ? 'cyber-glow bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary text-primary'
                  : 'cyber-card border-cyber-light/30 text-gray-400 hover:text-accent hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-4 h-4" />
              {snippet.title}
            </motion.button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Code Display */}
          <div className="lg:col-span-3 relative">
            <div className="cyber-card-enhanced h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-cyber-light/20 bg-cyber-gray/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-cyber text-lg text-accent">{activeSnippet.title}</h3>
                    <p className="text-gray-400 text-sm font-mono">{activeSnippet.language}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="p-2 rounded hover:bg-cyber-light/20 transition-all duration-200"
                  title="Copy code"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Code */}
              <div className="flex-grow overflow-y-auto p-4 font-mono text-sm bg-cyber-darker/50 relative">
                <pre className="language-python">
                  <code>{activeSnippet.code}</code>
                </pre>
              </div>
              
              {/* Description */}
              <div className="p-4 border-t border-cyber-light/20 bg-cyber-gray/50">
                <p className="text-gray-300 text-sm">{activeSnippet.description}</p>
              </div>
            </div>
          </div>
          
          {/* Controls and Output */}
          <div className="lg:col-span-2">
            <div className="grid gap-6 h-full">
              {/* Parameters */}
              <div className="cyber-card-enhanced">
                <div className="p-4 border-b border-cyber-light/20 bg-cyber-gray/50">
                  <h3 className="font-cyber text-lg text-accent">Parameters</h3>
                </div>
                <div className="p-4 space-y-4">
                  {Object.keys(params).length > 0 ? (
                    Object.entries(params).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <label className="block text-sm font-mono text-gray-300">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </label>
                        <input
                          type={typeof value === 'number' ? 'number' : 'text'}
                          value={value}
                          onChange={(e) => updateParam(key, 
                            typeof value === 'number' ? Number(e.target.value) : e.target.value)}
                          className="terminal-input w-full text-sm"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm font-mono">No configurable parameters</p>
                  )}
                </div>
                
                {/* Actions */}
                <div className="p-4 border-t border-cyber-light/20 bg-cyber-gray/50 flex gap-3">
                  <motion.button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="cyber-button text-sm flex-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isRunning ? (
                        <>
                          <div className="w-4 h-4 border-2 border-t-transparent border-primary rounded-full animate-spin" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Run Code
                        </>
                      )}
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleReset}
                    className="cyber-button text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </span>
                  </motion.button>
                </div>
              </div>
              
              {/* Output */}
              <div className="cyber-card-enhanced flex-grow">
                <div className="p-4 border-b border-cyber-light/20 bg-cyber-gray/50">
                  <h3 className="font-cyber text-lg text-accent">Output</h3>
                </div>
                <div className="p-4 font-mono text-sm bg-cyber-darker/80 h-full overflow-y-auto">
                  {executionOutput ? (
                    <pre className="text-gray-300 whitespace-pre-wrap">{executionOutput}</pre>
                  ) : (
                    <p className="text-gray-500">Run the code to see output</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeDemo;