import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Layout from "../../components/common/Layout";
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Activity,
  BarChart3,
  Plus,
} from "lucide-react";
import * as api from "../../services/api";
import "../../styles/ceo/ceo-dashboard.css";

export default function CEODashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeToday: 0,
    totalProjects: 0,
    activeProjects: 0,
    pendingLeaveRequests: 0,
    unreadMessages: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all dashboard data in parallel
      const [usersRes, projectsRes, leaveRequestsRes, messagesRes] =
        await Promise.all([
          api.getAllUsers({ active_only: true }).catch(() => ({ data: [] })),
          api.getCEOProjects({ limit: 5 }).catch(() => ({ data: [] })),
          api
            .getCEOLeaveRequests({ status: "pending" })
            .catch(() => ({ data: [] })),
          api.getMyMessages().catch(() => ({ data: [] })),
        ]);

      // Calculate stats
      const users = usersRes.data || [];
      const projects = projectsRes.data || [];
      const leaveRequests = leaveRequestsRes.data || [];
      const messages = messagesRes.data || [];

      setStats({
        totalEmployees: users.length,
        activeToday: users.filter((u) => u.is_active).length,
        totalProjects: projects.length,
        activeProjects: projects.filter((p) => p.status === "in_progress")
          .length,
        pendingLeaveRequests: leaveRequests.length,
        unreadMessages: messages.filter((m) => !m.is_read).length,
      });

      setRecentProjects(projects.slice(0, 5));

      // Set alerts
      const alertList = [];
      if (leaveRequests.length > 0) {
        alertList.push({
          type: "warning",
          message: `${leaveRequests.length} leave request${leaveRequests.length > 1 ? "s" : ""} pending approval`,
          action: () => navigate("/ceo/leave-requests"),
        });
      }

      setAlerts(alertList);

      // Mock recent activities
      setRecentActivities([
        {
          id: 1,
          type: "project",
          message: "New project created",
          user: "System",
          time: "2 hours ago",
          color: "#10b981",
        },
        {
          id: 2,
          type: "leave",
          message: "Leave request submitted",
          user: "John Doe",
          time: "3 hours ago",
          color: "#f59e0b",
        },
        {
          id: 3,
          type: "task",
          message: "Task completed",
          user: "Jane Smith",
          time: "5 hours ago",
          color: "#3b82f6",
        },
      ]);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="layout-loading">
          <div className="spinner spinner-lg"></div>
          <p className="layout-loading-text">Loading Dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">CEO Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome back, <strong>{user?.full_name}</strong>
            </p>
          </div>
          <div className="dashboard-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/ceo/projects")}
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="dashboard-alerts">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`dashboard-alert dashboard-alert-${alert.type}`}
                onClick={alert.action}
              >
                <AlertCircle className="dashboard-alert-icon" />
                <span className="dashboard-alert-message">{alert.message}</span>
                <ArrowUpRight className="dashboard-alert-arrow" />
              </div>
            ))}
          </div>
        )}

        {/* Stats Grid */}
        <div className="dashboard-stats-grid">
          {/* Total Employees */}
          <div
            className="dashboard-stat-card"
            onClick={() => navigate("/ceo/employees")}
          >
            <div className="dashboard-stat-content">
              <div className="dashboard-stat-info">
                <p className="dashboard-stat-label">Total Employees</p>
                <p className="dashboard-stat-value">{stats.totalEmployees}</p>
                <div className="dashboard-stat-footer">
                  <span className="dashboard-stat-badge dashboard-stat-badge-success">
                    {stats.activeToday} active today
                  </span>
                </div>
              </div>
              <div className="dashboard-stat-icon dashboard-stat-icon-blue">
                <Users className="w-8 h-8" />
              </div>
            </div>
            <div className="dashboard-stat-action">
              <span>View all employees</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Active Projects */}
          <div
            className="dashboard-stat-card"
            onClick={() => navigate("/ceo/projects")}
          >
            <div className="dashboard-stat-content">
              <div className="dashboard-stat-info">
                <p className="dashboard-stat-label">Active Projects</p>
                <p className="dashboard-stat-value">{stats.activeProjects}</p>
                <div className="dashboard-stat-footer">
                  <span className="dashboard-stat-badge dashboard-stat-badge-info">
                    {stats.totalProjects} total
                  </span>
                </div>
              </div>
              <div className="dashboard-stat-icon dashboard-stat-icon-green">
                <Briefcase className="w-8 h-8" />
              </div>
            </div>
            <div className="dashboard-stat-action">
              <span>View all projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Leave Requests */}
          <div
            className="dashboard-stat-card"
            onClick={() => navigate("/ceo/leave-requests")}
          >
            <div className="dashboard-stat-content">
              <div className="dashboard-stat-info">
                <p className="dashboard-stat-label">Pending Leaves</p>
                <p className="dashboard-stat-value">
                  {stats.pendingLeaveRequests}
                </p>
                <div className="dashboard-stat-footer">
                  <span className="dashboard-stat-badge dashboard-stat-badge-warning">
                    Needs approval
                  </span>
                </div>
              </div>
              <div className="dashboard-stat-icon dashboard-stat-icon-orange">
                <Calendar className="w-8 h-8" />
              </div>
            </div>
            <div className="dashboard-stat-action">
              <span>Review requests</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Messages */}
          <div
            className="dashboard-stat-card"
            onClick={() => navigate("/ceo/messages")}
          >
            <div className="dashboard-stat-content">
              <div className="dashboard-stat-info">
                <p className="dashboard-stat-label">Unread Messages</p>
                <p className="dashboard-stat-value">{stats.unreadMessages}</p>
                <div className="dashboard-stat-footer">
                  <span className="dashboard-stat-badge dashboard-stat-badge-info">
                    New communications
                  </span>
                </div>
              </div>
              <div className="dashboard-stat-icon dashboard-stat-icon-purple">
                <MessageSquare className="w-8 h-8" />
              </div>
            </div>
            <div className="dashboard-stat-action">
              <span>View messages</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-content-grid">
          {/* Recent Projects */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">
                <Briefcase className="w-5 h-5" />
                <span>Active Projects</span>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigate("/ceo/projects")}
              >
                View All
              </button>
            </div>
            <div className="dashboard-card-body">
              {recentProjects.length === 0 ? (
                <div className="dashboard-empty-state">
                  <Briefcase className="dashboard-empty-icon" />
                  <p>No active projects</p>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate("/ceo/projects")}
                  >
                    Create First Project
                  </button>
                </div>
              ) : (
                <div className="dashboard-list">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="dashboard-list-item"
                      onClick={() => navigate(`/ceo/projects/${project.id}`)}
                    >
                      <div className="dashboard-list-item-info">
                        <h4 className="dashboard-list-item-title">
                          {project.project_name}
                        </h4>
                        <p className="dashboard-list-item-subtitle">
                          Assigned to: {project.team_lead_name || "Unassigned"}
                        </p>
                      </div>
                      <div className="dashboard-list-item-meta">
                        <div className="dashboard-progress">
                          <span className="dashboard-progress-text">
                            {project.progress_percentage || 0}%
                          </span>
                          <div className="dashboard-progress-bar">
                            <div
                              className="dashboard-progress-fill"
                              style={{
                                width: `${project.progress_percentage || 0}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">
                <Activity className="w-5 h-5" />
                <span>Recent Activities</span>
              </div>
            </div>
            <div className="dashboard-card-body">
              {recentActivities.length === 0 ? (
                <div className="dashboard-empty-state">
                  <Activity className="dashboard-empty-icon" />
                  <p>No recent activities</p>
                </div>
              ) : (
                <div className="dashboard-activity-list">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="dashboard-activity-item">
                      <div
                        className="dashboard-activity-indicator"
                        style={{ backgroundColor: activity.color }}
                      />
                      <div className="dashboard-activity-content">
                        <p className="dashboard-activity-message">
                          <strong>{activity.user}</strong> - {activity.message}
                        </p>
                        <p className="dashboard-activity-time">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div className="dashboard-card-title">
              <TrendingUp className="w-5 h-5" />
              <span>Quick Actions</span>
            </div>
          </div>
          <div className="dashboard-card-body">
            <div className="dashboard-quick-actions">
              <button
                className="dashboard-quick-action-btn"
                onClick={() => navigate("/ceo/projects")}
              >
                <Briefcase className="w-5 h-5" />
                <span>Create Project</span>
              </button>
              <button
                className="dashboard-quick-action-btn"
                onClick={() => navigate("/ceo/performance")}
              >
                <BarChart3 className="w-5 h-5" />
                <span>View Performance</span>
              </button>
              <button
                className="dashboard-quick-action-btn"
                onClick={() => navigate("/ceo/attendance")}
              >
                <Clock className="w-5 h-5" />
                <span>Check Attendance</span>
              </button>
              <button
                className="dashboard-quick-action-btn"
                onClick={() => navigate("/ceo/leave-requests")}
              >
                <Calendar className="w-5 h-5" />
                <span>Review Leaves</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}